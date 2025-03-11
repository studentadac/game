window.onload = function () {

    const BG_COLOR = '#808080'; // わかりやすい名前を付ける

    // enchant.js の Core(960, 640) に相当
    var config = {
        type: Phaser.AUTO, // WebGL または Canvas を自動選択（Core の代替）
        width: 960, // 画面幅を指定（Core の引数の代替）
        height: 640, // 画面高さを指定（Core の引数の代替）
        backgroundColor: BG_COLOR, // enchant.js の <body bgcolor="grey"> に相当
        scene: {
            preload: preload, // プリロード関数（game.preload() に相当）
            create: create // ゲームの初期化（game.onload に相当）
        }
    };

    var game = new Phaser.Game(config); // Phaser のゲームオブジェクトを作成（Core の代替）

    function preload() {
        // 画像や音楽のプリロード（game.preload() に相当）
    }

    function create() {
        // enchant.js の Label を Phaser の add.text() に置き換え
        var label = this.add.text(200, 100, 'Hello World', {
            fontSize: '32px', // フォントサイズ（Label のテキストサイズ相当）
            color: '#ffffff', // テキスト色（デフォルト黒なので明示的に白へ）
            fontFamily: 'Arial' // フォント指定（enchant.js ではデフォルト）
        });

        // sceneGameMain.addChild(label) に相当（Phaser は add.text() だけでOK）
    }
};
