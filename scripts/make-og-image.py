#!/usr/bin/env python3
"""Build Flame Connect link-preview (Open Graph) cards as small JPEGs."""
import sys, io
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","public")
MF="/usr/share/fonts/truetype/google-fonts/ofl/montserrat/Montserrat[wght].ttf"
PF="/usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf"
PM="/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf"
W,H=1200,630
def mont(size,style="ExtraBold"):
    f=ImageFont.truetype(MF,size); f.set_variation_by_name(style); return f
def base():
    im=Image.new("RGB",(W,H),"#07111F")
    # diagonal navy gradient
    import numpy as np
    yy,xx=np.mgrid[0:H,0:W]; t=(xx*0.77+yy*0.64)/(W*0.77+H*0.64)
    g=Image.fromarray((np.clip(t,0,1)*255).astype("uint8"),"L")
    top=Image.new("RGB",(W,H),"#0F1D33"); bot=Image.new("RGB",(W,H),"#04090F")
    im=Image.composite(bot,top,g)
    # orange glow
    glow=Image.new("L",(W,H),0); d=ImageDraw.Draw(glow); d.ellipse((480,-260,1040,300),fill=110)
    glow=glow.filter(ImageFilter.GaussianBlur(110))
    im=Image.composite(Image.new("RGB",(W,H),"#F4511E"),im,glow)
    # hero photo right 40%
    hero=Image.open(f"{R}/images/home-hero.jpg").convert("RGB")
    pw=int(W*0.4); ratio=max(pw/hero.width,H/hero.height)
    hero=hero.resize((int(hero.width*ratio)+1,int(hero.height*ratio)+1),Image.LANCZOS)
    l=(hero.width-pw)//2; t=(hero.height-H)//2; hero=hero.crop((l,t,l+pw,t+H))
    # soft left fade into navy
    mask=Image.new("L",(pw,H),255); md=ImageDraw.Draw(mask)
    for x in range(90): md.line((x,0,x,H),fill=int(255*x/90))
    im.paste(hero,(W-pw,0),mask)
    return im
def brand(im,d):
    mark=Image.open(f"{R}/brand/flame-connect-mark.png").convert("RGBA").resize((64,64),Image.LANCZOS)
    im.paste(mark,(72,72),mark)
    d.text((152,70),"Flame Connect",font=mont(30),fill="#F4511E")
    d.text((153,110),"AI CENTRE OF CHANGE",font=ImageFont.truetype(PM,15),fill="#A9BBDF")
def wrap(d,text,font,maxw):
    lines=[];cur=""
    for w in text.split():
        t=(cur+" "+w).strip()
        if d.textlength(t,font=font)<=maxw: cur=t
        else: lines.append(cur);cur=w
    lines.append(cur);return lines
def save(im,path):
    for q in (85,80,75,70):
        b=io.BytesIO(); im.save(b,"JPEG",quality=q,optimize=True,progressive=True)
        if b.tell()<200_000: break
    open(path,"wb").write(b.getvalue()); print(path,b.tell(),"bytes q",q)
def site(path):
    im=base(); d=ImageDraw.Draw(im); brand(im,d)
    f=mont(66); x=72; y=250
    d.text((x,y),"Digitizing",font=f,fill="white"); x2=x+d.textlength("Digitizing ",font=f)
    d.text((x2,y),"Africa.",font=f,fill="#F4511E")
    d.text((72,350),"AI Centre of Change · Practical AI",font=ImageFont.truetype(PF,24),fill="#C5D4F5")
    d.text((72,384),"for African progress.",font=ImageFont.truetype(PF,24),fill="#C5D4F5")
    d.text((72,450),"Assess. Learn. Improve. Implement.",font=ImageFont.truetype(PF,18),fill="#FFD9C8")
    save(im,path)
def article(path,eyebrow,title,foot):
    im=base(); d=ImageDraw.Draw(im); brand(im,d)
    d.text((72,200),eyebrow.upper(),font=ImageFont.truetype(PM,17),fill="#F4511E")
    size=50
    while True:
        f=mont(size); lines=wrap(d,title,f,W*0.6-110)
        if len(lines)<=4 or size<=38: break
        size-=2
    y=236
    for ln in lines: d.text((72,y),ln,font=f,fill="white"); y+=int(size*1.18)
    d.text((72,H-92),foot,font=ImageFont.truetype(PF,19),fill="#C5D4F5")
    save(im,path)
if __name__=="__main__":
    """Usage:
    python scripts/make-og-image.py site
    python scripts/make-og-image.py article <slug> "<eyebrow>" "<title>"
    Writes public/og/<name>.jpg (1200x630, < 200 KB). Needs Pillow, numpy,
    Montserrat and Poppins fonts (paths at the top of this file)."""
    os.makedirs(f"{R}/og",exist_ok=True)
    if sys.argv[1]=="site": site(f"{R}/og/flame-connect.jpg")
    else: article(f"{R}/og/{sys.argv[2]}.jpg",sys.argv[3],sys.argv[4],"flameconnect.tech/insights")
