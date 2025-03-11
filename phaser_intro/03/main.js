window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        width: 960,
        height: 640,
        backgroundColor: '#a0e0a0',
        scene: {
            preload: preload,
            create: create
        }
    };

    const game = new Phaser.Game(config);

    function preload() {
        // 画像をロード（フィールドのタイル画像など）
        this.load.image('grass', 'assets/images/grass.png');
    }

    function create() {
        // 背景を作成
        this.add.tileSprite(0, 0, 960, 640, 'grass').setOrigin(0, 0);
    }
};
