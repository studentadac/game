// Phaser の設定
const config = {
    type: Phaser.WEBGL, // 明示的に WEBGL を使用
    width: 960,
    height: 640,
    parent: 'game-container',
    scene: {
      preload,
      create
    },
    render: {
      mipmap: false, // ミップマップを無効化
    }
  };
  
  const game = new Phaser.Game(config);
  
  // tileTypes の定義（enchant.js の定義をそのまま再現）
  const tileTypes = {
    umi:  { id: 0, name: "umi" },
    arai: { id: 1, name: "arai" },
    asai: { id: 2, name: "asai" },
    riku: { id: 3, name: "riku" },
    iwa:  { id: 4, name: "iwa" }
  };
  
  // プレロード関数
  function preload() {
    // 各画像をプリロード
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
  
  // Phaser 版の GameMap クラスの機能を再現するための処理
  function create() {
    // 枠（frame）：全体サイズ 960×640、中央配置
    this.add.image(480, 320, 'mapFrame');
  
    // 背景：元コードではサイズ 64*13 x 64*9 (832×576)、配置位置 x=64, y=10、origin (0,0)
    this.add.image(64, 10, 'mapBackground').setOrigin(0, 0);
  
    // タイルマップの作成（enchant.js の Map クラスの代わりに Phaser の tilemap を使用）
    const tilemap = this.make.tilemap({
      data: mapData,
      tileWidth: 64,
      tileHeight: 64
    });
    const tileset = tilemap.addTilesetImage('mapTiles');
    // タイルレイヤーを (64,10) に配置、透明度 0.25
    const layer = tilemap.createLayer(0, tileset, 64, 10);
    layer.setAlpha(0.25);
  
    // 衝突判定用の関数（tileTypes.riku.id と tileTypes.iwa.id が衝突対象）
    function hitTest(tileIndex) {
      return (tileIndex === tileTypes.riku.id || tileIndex === tileTypes.iwa.id);
    }
  
    // タイル情報取得用の関数
    function getTileInfo(id) {
      for (let key in tileTypes) {
        if (tileTypes[key].id === id) {
          return tileTypes[key];
        }
      }
      return null;
    }
  
    // タッチ／クリックイベントをシーン全体に追加（背景などの上にも反応する場合）
    this.input.on('pointerup', (pointer) => {
      // タイルレイヤーは (64,10) から始まるのでオフセットを引く
      const localX = pointer.x - 64;
      const localY = pointer.y - 10;
      // タイル座標を計算（タイルサイズ 64x64）
      const tileX = Math.floor(localX / 64);
      const tileY = Math.floor(localY / 64);
      // タイルマップからタイル情報を取得
      const tile = tilemap.getTileAt(tileX, tileY);
      if (tile) {
        const tileInfo = getTileInfo(tile.index);
        if (hitTest(tile.index)) {
          alert("通れない、" + tileInfo.name);
          console.log("通れない", tileInfo.name, "world X", pointer.x, "localX", localX, "worldY", pointer.y, "localY", localY);
        } else {
          alert("通れる、" + tileInfo.name);
          console.log("通れる", tileInfo.name, "world X", pointer.x, "localX", localX, "worldY", pointer.y, "localY", localY);
        }
      } else {
        console.log("タイルなし");
      }
    });
  
    // オーディオの再開処理（ユーザーの初回タッチで AudioContext を再開）
    this.input.once('pointerdown', () => {
      this.sound.context.resume().then(() => {
        console.log('AudioContext resumed successfully.');
      }).catch((e) => {
        console.error('Failed to resume AudioContext:', e);
      });
    });
  }
  