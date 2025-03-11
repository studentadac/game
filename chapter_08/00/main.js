// Phaserの設定
const config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 640,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// ゲームインスタンスを作成
const game = new Phaser.Game(config);

// Phaserのゲームオブジェクトが初期化される直後にキャンバスを取得して設定を変更
game.events.on('ready', function() {
    // Phaserのキャンバス取得
    let canvas = game.canvas;
    // getContextにwillReadFrequentlyを設定
    let context = canvas.getContext('2d', { willReadFrequently: true });
});

// プレロード関数
function preload() {
    this.load.image('mapBack', "../../../resources/mapframe.png"); // 画像をロードするパスを指定
}

// ゲームシーンの作成
function create() {
    this.add.image(480, 320, 'mapBack'); // 背景画像を配置（中央に）
}

// アップデート関数（ゲームループ）
function update() {
    // ゲームの更新処理があればここに追加
}
