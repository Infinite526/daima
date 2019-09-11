//id，src必传字符串
//mode：center 居中留白 cutOut 居中剪裁
class ImgPlug {
    constructor(id, src, mode = 'center') {
        let node = document.getElementById(id);
        if (!node) return;
        let img = document.createElement("img");
        img.src = src;

        img.onload = function() {
            let imgWidth = img.width,
                imgHeight = img.height,
                boxWidth = node.offsetWidth,
                boxHeight = node.offsetHeight,
                imgScale = imgWidth / imgHeight,
                boxScale = boxWidth / boxHeight;
            node.style.cssText = `display: flex; align-items: center; justify-content: center;overflow: hidden;`;
            //判断模式,默认是居中留白
            if (mode == 'center') {
                if (imgScale >= boxScale) {
                    img.width = boxWidth;
                    img.height = boxWidth / imgScale;
                } else {
                    img.height = boxHeight;
                    img.width = boxHeight * imgScale;
                }
            } else {
                if (imgScale >= boxScale) {
                    img.height = boxHeight;
                    img.width = boxHeight * imgScale;
                } else {
                    img.width = boxWidth;
                    img.height = boxWidth / imgScale;
                }
            }
            node.appendChild(img);
        }
    }
}