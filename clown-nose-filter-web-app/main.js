var canvas, video, posenet, clownnose, x = 0, y = 0;

function preload() {}
function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    clownnose = loadImage("https://i.postimg.cc/xjFtn3MD/channels4-profile.jpg");

    posenet = ml5.poseNet(video, () => console.log("Loaded model!"));
    posenet.on('pose', (results) => {
        if(results.length > 0) {
            x = results[0].pose.nose.x - 15;
            y = results[0].pose.nose.y - 2;
        }
    });
}
function draw() {
    image(video, 0, 0, 300, 300);
    image(clownnose, x, y, 30, 30);
}
function takeSnap() {
    save("im-a-cat-" + Math.random() + ".jpg");
}