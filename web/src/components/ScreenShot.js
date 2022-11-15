import { Button } from "react-bootstrap";
import { FaPrint } from "react-icons/fa";
import html2canvas from "html2canvas";

const ScreenShot = ({ element }) => {
  // const [_, takeScreenShot] = useScreenshot({
  //   type: "image/jpeg",
  //   quality: 1.0,
  //   useCORS: true,
  // });
  const downloadScreenshot = () => {
    html2canvas(element, { useCORS: true })
      .then((canvas) => {
        return canvas.toDataURL("image/jpeg", 1);
      })
      .then((image) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = "image.jpg";
        a.click();
      });
  };
  return (
    <Button className={"m-1"} onClick={downloadScreenshot}>
      <FaPrint />
    </Button>
  );
};
export default ScreenShot;
