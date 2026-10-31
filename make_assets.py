from PIL import Image
import cv2, numpy as np, os
src='/mnt/data/files/a_clean_web_ui_app_style_split_panel_image_with.png'
im=cv2.imread(src)
# Crop the complete studio-photo regions, excluding the dark text panels.
regions={
 'toyota-prius-current.jpg':(49,20,949,524,[(76,48,240,123),(710,47,925,126)]),
 'toyota-corolla-current.jpg':(997,20,1905,524,[(1024,48,1188,123),(1660,47,1882,126)])
}
out='/mnt/data/aloha_update/assets'
os.makedirs(out,exist_ok=True)
for name,(x1,y1,x2,y2,masks) in regions.items():
 crop=im[y1:y2,x1:x2].copy()
 mask=np.zeros(crop.shape[:2],dtype=np.uint8)
 for ax,ay,bx,by in masks:
  # Slightly expand overlay rectangles to cover antialiased edges/shadows.
  ax=max(x1,ax-5)-x1; ay=max(y1,ay-5)-y1; bx=min(x2,bx+5)-x1; by=min(y2,by+5)-y1
  cv2.rectangle(mask,(ax,ay),(bx,by),255,-1)
 # Inpaint only the clean studio backdrop behind the UI overlays.
 clean=cv2.inpaint(crop,mask,35,cv2.INPAINT_TELEA)
 # Subtle soften compression/grain to match a real used-car listing photo.
 clean=cv2.GaussianBlur(clean,(3,3),0.35)
 cv2.imwrite(os.path.join(out,name),clean,[cv2.IMWRITE_JPEG_QUALITY,92])
 print(name,clean.shape)
