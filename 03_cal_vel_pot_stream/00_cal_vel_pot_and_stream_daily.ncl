;*************************************************
; wind_1.ncl
;*************************************************
load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_code.ncl"   
load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_csm.ncl"    
load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/contributed.ncl" 
;*************************************************
begin
;*************************************************
f_u = addfile("../../data/daily_nc/pl_u_1000_1979_2021_daily.nc","r")
u = f_u->u
;;;;;;;;;;;;;;;;;;;;
f_v = addfile("../../data/daily_nc/pl_v_1000_1979_2021_daily.nc","r")
v = f_v->v
;;;;;;;;;;;;;;;;;;;;
time = f_u->time
lat = f_u->latitude
lon = f_u->longitude

ntim  = dimsizes(time)	; get dimension sizes
nlat  = dimsizes(lat)
nlon  = dimsizes(lon)
;;;;;;;;;;;;;;;;;;;;

u_re = new((/ntim,nlat,nlon/), double)
v_re = new((/ntim,nlat,nlon/), double)

j = 0
do while(j.le.72)
  u_re(:,72-j,:) = u(:,j,:)
  v_re(:,72-j,:) = v(:,j,:)
  j=j+1 
end do

uvmsg = 1e+36
sf_rev = new((/ntim,nlat,nlon/), double, uvmsg)
vp_rev = new((/ntim,nlat,nlon/), double, uvmsg)

uv2sfvpg(u_re,v_re,sf_rev,vp_rev)   ;;opposite sign issue by jhson

sf = new((/ntim,nlat,nlon/), double, uvmsg)
vp = new((/ntim,nlat,nlon/), double, uvmsg)

j = 0
do while(j.le.72)
  sf(:,72-j,:) = sf_rev(:,j,:)
  vp(:,72-j,:) = vp_rev(:,j,:)
  j=j+1  
end do

;;;;;write ncdf file
;;;streamfunction SF;;;;;
system("rm -f /data2/jhson/era5/data/daily_nc/pl_sf_1000_1979_2021_daily.nc")
fout_sf = addfile ("/data2/jhson/era5/data/daily_nc/pl_sf_1000_1979_2021_daily.nc","c")
setfileoption(fout_sf,"DefineMode",True)

fAtt               = True            ; assign file attributes
fAtt@title         = "Streamfunction"  
fAtt@source_file   =  "U-V wind"
fAtt@Conventions   = "None"   
fAtt@creation_date = systemfunc ("date")        
fileattdef( fout_sf, fAtt )            ; copy file attributes  

dimNames = (/"time", "latitude", "longitude"/)  
dimSizes = (/ -1   ,  nlat,  nlon/) 
dimUnlim = (/ True , False, False/)   
filedimdef(fout_sf,dimNames,dimSizes,dimUnlim)

;print(lat)
;print(u)
;print(sf)

filevardef(fout_sf, "time" ,typeof(time),getvardims(time)) 
filevardef(fout_sf, "latitude"  ,typeof(lat),getvardims(lat)) 
filevardef(fout_sf, "longitude"  ,typeof(lon),getvardims(lon))                          
filevardef(fout_sf, "sf"    ,typeof(sf),(/"time","latitude","longitude"/))    

filevarattdef(fout_sf,"sf",sf)                           ; copy T attributes
filevarattdef(fout_sf,"time" ,time)                    ; copy time attributes
filevarattdef(fout_sf,"latitude"  ,lat)                     ; copy lat attributes
filevarattdef(fout_sf,"longitude"  ,lon)                     ; copy lon attributes

setfileoption(fout_sf,"DefineMode",False)

fout_sf->time=(/time/)
fout_sf->latitude=(/lat/)
fout_sf->longitude=(/lon/)
fout_sf->sf=(/sf/)

;;;velocity potential VP;;;;;
system("rm -f /data2/jhson/era5/data/daily_nc/pl_vp_1000_1979_2021_daily.nc")
fout_vp = addfile ("/data2/jhson/era5/data/daily_nc/pl_vp_1000_1979_2021_daily.nc","c")
setfileoption(fout_vp,"DefineMode",True)

fAtt               = True            ; assign file attributes
fAtt@title         = "Velocity Potential"                         
fAtt@source_file   =  "U-V wind"
fAtt@Conventions   = "None"   
fAtt@creation_date = systemfunc ("date")        
fileattdef( fout_vp, fAtt )            ; copy file attributes


dimNames = (/"time", "latitude", "longitude"/)               
dimSizes = (/ -1   ,  nlat,  nlon/)        
dimUnlim = (/ True , False, False/)          
filedimdef(fout_vp,dimNames,dimSizes,dimUnlim)

filevardef(fout_vp, "time" ,typeof(time),getvardims(time))       
filevardef(fout_vp, "latitude"  ,typeof(lat),getvardims(lat))       
filevardef(fout_vp, "longitude"  ,typeof(lon),getvardims(lon))       
filevardef(fout_vp, "vp"    ,typeof(vp),(/"time","latitude","longitude"/))    

filevarattdef(fout_vp,"vp",vp)                           ; copy T attributes
filevarattdef(fout_vp,"time" ,time)                    ; copy time attributes
filevarattdef(fout_vp,"latitude"  ,lat)                     ; copy lat attributes
filevarattdef(fout_vp,"longitude"  ,lon)                     ; copy lon attributes

setfileoption(fout_vp,"DefineMode",False)

;print(time)
;print(lat)

fout_vp->time=(/time/)
fout_vp->latitude=(/lat/)
fout_vp->longitude=(/lon/)
fout_vp->vp=(/vp/)

end
