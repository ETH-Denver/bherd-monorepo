export const formatContentType = (contentType) => {
  const contentTypes = {
    0: "Sky Typing",
    1: "Banner Plane",
  };
  if (contentType || contentType === 0) {
    return contentTypes[contentType];
  }
};
