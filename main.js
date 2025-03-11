// tileTypes の定義（元のコードをそのまま再現）
const tileTypes = {
    umi:  { id: 0, name: "umi" },
    arai: { id: 1, name: "arai" },
    asai: { id: 2, name: "asai" },
    riku: { id: 3, name: "riku" },
    iwa:  { id: 4, name: "iwa" }
  };
  
  // 衝突判定用関数（riku または iwa なら通れない）
  function hitTest(tileIndex) {
    return (tileIndex === tileTypes.riku.id || tileIndex === tileTypes.iwa.id);
  }
  
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
    // 各画像をプリロード（パスは相対パスで指定）
    this.load.image('mapFrame', './resources/mapframe.png');
    this.load.image('mapBackground', './resources/map00.png');
    this.load.image('mapTiles', './resources/maptiles.png');
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
  
  // Phaser 版 GameMap クラス
  class GameMap {
    constructor(scene, mapData) {
      this.scene = scene;
      
      // 枠の表示（全体サイズ 960×640、中央配置）
      this.frame = scene.add.image(480, 320, 'mapFrame');
      
      // 背景の表示（サイズ: 64*13 x 64*9 = 832×576, 配置位置: x=64, y=10, origin: (0,0)）
      this.background = scene.add.image(64, 10, 'mapBackground').setOrigin(0, 0);
      
      // タイルマップの作成（Phaser の tilemap を使用）
      this.tilemap = scene.make.tilemap({
        data: mapData,
        tileWidth: 64,
        tileHeight: 64
      });
      this.tileset = this.tilemap.addTilesetImage('mapTiles');
      // タイルレイヤーを (64,10) に配置し、透明度 0.25
      this.layer = this.tilemap.createLayer(0, this.tileset, 64, 10);
      this.layer.setAlpha(0.25);
      
      // マップのサイズ保存
      this.mapHeight = mapData.length;
      this.mapWidth = mapData[0].length;
      
      // 衝突判定用の collisionData は、Phaser の場合、hitTest 関数で判定するのでここでは生成しなくてもよい
      
      // タッチ／クリックイベントの設定
      this.layer.setInteractive();
      this.layer.on('pointerup', (pointer) => {
        this.ontouchend(pointer);
      });
    }
    
    // 画面上の座標をタイル座標に変換する（オフセットを考慮）
    toLocalSpace(x, y) {
      return { x: x - 64, y: y - 10 };
    }
    
    // タイル情報取得
    getTileInfo(id) {
      for (let key in tileTypes) {
        if (tileTypes[key].id === id) {
          return tileTypes[key];
        }
      }
      return null;
    }
    
    // タッチ終了時の処理
    ontouchend(pointer) {
      // ローカル座標へ変換（タイルレイヤーの配置オフセットが (64,10) のため）
      const localPos = this.toLocalSpace(pointer.x, pointer.y);
      // タイルサイズ 64x64 でタイル座標を計算
      const tileX = Math.floor(localPos.x / 64);
      const tileY = Math.floor(localPos.y / 64);
      // タイル情報を取得
      const tile = this.tilemap.getTileAt(tileX, tileY);
      if (tile) {
        const tileInfo = this.getTileInfo(tile.index);
        if (hitTest(tile.index)) {
          alert("通れない、" + tileInfo.name);
        } else {
          alert("通れる、" + tileInfo.name);
        }
        console.log(tileInfo.name, "worldX:", pointer.x, "localX:", localPos.x, "worldY:", pointer.y, "localY:", localPos.y);
      } else {
        console.log("タイルが存在しません");
      }
    }
  }
  
  // シーンの作成
  function create() {
    const scene = this;
    
    // オーディオ再開処理（ユーザー初回タッチで AudioContext を再開）
    scene.input.once('pointerdown', () => {
      scene.sound.context.resume().then(() => {
        console.log('AudioContext resumed successfully.');
      }).catch((e) => {
        console.error('Failed to resume AudioContext:', e);
      });
    });
    
    // GameMap クラスを利用してマップを作成
    const gameMap = new GameMap(scene, mapData);
    
    // ※ 必要に応じて、ここでさらにシーンに追加するオブジェクト等の設定を行う
  }
  
