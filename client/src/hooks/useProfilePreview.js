import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useProfilePreview = () => {
  const toast = useToast();
  const [imgUrl, setImgUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Error",
        description: "Please Upload an image file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  console.log(imgUrl);
  return { handleImageChange, imgUrl };
};

export default useProfilePreview;
