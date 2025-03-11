const config = {
    type: Phaser.WEBGL,  // 明示的にWEBGLを選択
    width: 960,
    height: 640,
    parent: 'game-container',
    scene: {
        preload,
        create
    },
    // WebGLの設定をカスタマイズ
    render: {
        mipmap: false,  // ミップマップを無効化
    }
};

const game = new Phaser.Game(config);

function preload() {
    // 画像をCanvasに描画してからテクスチャとして読み込む
    loadImageAndCreateTexture(this, '../../../resources/mapframe.png', 'mapFrame');
    this.load.image('mapBackground', '../../../resources/map00.png');
    this.load.image('mapTiles', '../../../resources/maptiles.png');
}

function create() {
    // 背景の表示
    this.add.image(512, 256, 'mapBackground');
    this.add.image(64, 8, 'mapBackground').setOrigin(0, 0);

    // タイルマップの作成
    const map = this.make.tilemap({ 
        data: mapData, 
        tileWidth: 64, 
        tileHeight: 64
    });

    // タイルセットの追加
    const tileset = map.addTilesetImage('mapTiles');

    // レイヤーの作成（マップデータを適用）
    const layer = map.createLayer(0, tileset, 64, 10);
    
    // レイヤーの透明度を設定
    layer.setAlpha(0.5);

    // オーディオの再開処理
    this.input.once('pointerdown', () => {
        this.sound.context.resume().then(() => {
            console.log('AudioContext resumed successfully.');
        }).catch((e) => {
            console.error('Failed to resume AudioContext:', e);
        });
    });
}

// 画像をCanvasに描画してからテクスチャとして追加する関数
function loadImageAndCreateTexture(scene, imageSrc, textureName) {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
        // 画像がロードされた後、Canvasに描画してからテクスチャを作成
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Canvasからテクスチャを作成
        scene.textures.addCanvas(textureName, canvas);
    };
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
