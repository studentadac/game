// ページがロードされた際に実行される関数
window.onload = function() {
    const config = {
        type: Phaser.AUTO, // WebGL または Canvas を自動選択
        width: 960, // 画面幅
        height: 640, // 画面高さ
        backgroundColor: '#808080', // 背景色
        scene: {
            preload: preload, // プレロード関数
            create: create,   // ゲームの初期化
        }
    };

    const game = new Phaser.Game(config); // ゲームオブジェクトを作成

    // プレロード関数（画像やその他のリソースを読み込む場所）
    function preload() {
        // 必要なリソースがあればここでプリロードします
    }

    // ゲームシーンの初期化（メインシーンの作成）
    function create() {
        // "Hello World"のテキストを作成
        const label = this.add.text(200, 100, 'Hello World', {
            fontSize: '32px', // フォントサイズ
            color: '#ffffff', // テキスト色
            fontFamily: 'Arial' // フォントファミリ
        });
    }
};
