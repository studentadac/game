// Phaser の設定
const config = {
    type: Phaser.WEBGL,  // 明示的に WEBGL を使用
    width: 960,
    height: 640,
    parent: 'game-container',
    scene: {
      preload,
      create
    },
    render: {
      mipmap: false,  // ミップマップを無効化
    }
  };
  
  const game = new Phaser.Game(config);
  
  // プレロード関数
  function preload() {
    // 画像をプリロード（元のファイルパスに合わせて指定）
    this.load.image('mapFrame', '../../../resources/mapframe.png');
    this.load.image('mapBackground', '../../../resources/map00.png');
    this.load.image('mapTiles', '../../../resources/maptiles.png');
  }
  
  // マップデータ（数値マトリックス）
  const mapData = [
    [3, 3, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    [3, 2, 0, 0, 2, 3, 3, 2, 0, 1, 0, 0, 0],
    [3, 0, 4, 0, 2, 3, 3, 2, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 2, 2, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 1, 1, 0, 4, 0],
    [1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 3, 2, 0, 0, 0, 0, 4, 2, 3],
    [0, 0, 0, 3, 3, 3, 2, 0, 0, 2, 2, 3, 3]
  ];
  
  function create() {
    // 枠（frame）：全体サイズ 960×640、中央に配置（Phaser のデフォルト origin は 0.5）
    this.add.image(480, 320, 'mapFrame');
    
    // 背景：元コードでは Sprite サイズは (64*13)×(64*9)=832×576、x=64, y=10（左上配置）
    // Phaser では、背景画像を (64,10) に配置し、origin を (0,0) に設定
    this.add.image(64, 10, 'mapBackground').setOrigin(0, 0);
    
    // タイルマップの作成
    // enchant.js の Map クラスの代わりに、Phaser の tilemap を利用
    const tilemap = this.make.tilemap({
      data: mapData,
      tileWidth: 64,
      tileHeight: 64
    });
    // タイルセットの追加（mapTiles を使用）
    const tileset = tilemap.addTilesetImage('mapTiles');
    // レイヤーの作成：タイルマップも (64,10) のオフセットで配置、透明度 0.25
    const layer = tilemap.createLayer(0, tileset, 64, 10);
    layer.setAlpha(0.25);
    
    // ※ enchant.js のコードではタッチイベントの設定はなかった場合、
    //    必要に応じてここにイベント処理を追加できます
    
    // オーディオの再開処理（ユーザーの初回タッチで AudioContext を再開）
    this.input.once('pointerdown', () => {
      this.sound.context.resume().then(() => {
        console.log('AudioContext resumed successfully.');
      }).catch((e) => {
        console.error('Failed to resume AudioContext:', e);
      });
    });
  }
  