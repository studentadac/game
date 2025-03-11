// 新しいPhaser 3のコードでゲームの初期化を行います。

window.onload = function() {
    // Phaser 3のゲーム設定を行います。
    const config = {
        type: Phaser.AUTO,  // WebGLまたはCanvasを自動選択
        width: 960,          // 画面幅
        height: 640,         // 画面高さ
        scene: {
            preload: preload,  // 画像をロードするメソッド
            create: create     // ゲームの初期化処理を行うメソッド
        }
    };

    // Phaserのゲームオブジェクトを作成
    const game = new Phaser.Game(config);

    // 画像をロード
    function preload() {
        this.load.image('boat', 'assets/images/boat.png');  
    }

    // スプライトを作成
    function create() {
        // スプライトを作成し、位置を調整
        const sprite = this.add.sprite(100, 100, 'boat'); // 左上(100,100)に配置
        sprite.setDisplaySize(512, 512); // 画像の表示サイズを設定
        sprite.setOrigin(0, 0); // 原点を左上に変更（デフォルトは中央）
    }
};
