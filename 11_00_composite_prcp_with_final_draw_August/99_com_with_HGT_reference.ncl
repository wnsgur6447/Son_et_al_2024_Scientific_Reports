;*************************************************
;
; These files are loaded by default in NCL V6.2.0 and newer
; load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_code.ncl"
; load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_csm.ncl"
;**************************************************
begin
;*************************************
; read in uwnd for index
;************************************
   f_uwnd   = addfile("/data2/jhson/era5/data/monthly_nc/pl_u_150_1979_2020_monthly.nc","r")  ;;[504,73,144]
   U150 = f_uwnd->u
   f_uwnd   = addfile("/data2/jhson/era5/data/monthly_nc/pl_u_200_1979_2020_monthly.nc","r")  ;;[504,73,144]
   U200 = f_uwnd->u
   f_uwnd   = addfile("/data2/jhson/era5/data/monthly_nc/pl_u_300_1979_2020_monthly.nc","r")  ;;[504,73,144]
   U300 = f_uwnd->u
   f_uwnd   = addfile("/data2/jhson/era5/data/monthly_nc/pl_u_400_1979_2020_monthly.nc","r")  ;;[504,73,144]
   U400 = f_uwnd->u
   f_uwnd   = addfile("/data2/jhson/era5/data/monthly_nc/pl_u_500_1979_2020_monthly.nc","r")  ;;[504,73,144]
   U500 = f_uwnd->u

   U = (U150+U200+U300+U400)/4.
   ;U = (U200+U300+U400)/3.
   ;U = (U150+U200+U300+U400+U500)/5.
   ;U = U300

   lon = f_uwnd->longitude
   lat = f_uwnd->latitude

   uwnd = reshape(U,(/42,12,73,144/))
   uwnd!0="year"
   uwnd!1="month"
   uwnd!2="latitude"
   uwnd!3="longitude"

   uwnd&year = fspan(1979,2020,42)
   uwnd&month = fspan(1,12,12)
   uwnd&latitude = fspan(90,-90,73)
   uwnd&longitude = fspan(0,360,144)

   index = wgt_areaave_Wrap(uwnd(:,:,{27.5:35},{60:80}),1,1,0)    ;lat{27.5:35}, lon{60:80}

   ;;;normalization;;;
   index = dim_standardize_n(index,1,0) ;normalization for dimention 0[year]
   ;print(index)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; read HGT
;************************************

   f_z   = addfile("/data2/jhson/era5/data/monthly_nc/pl_z_850_1979_2020_monthly.nc","r")  ;;[504,73,144]
   z850 = f_z->z
   f_z   = addfile("/data2/jhson/era5/data/monthly_nc/pl_z_700_1979_2020_monthly.nc","r")  ;;[504,73,144]
   z700 = f_z->z
   f_z   = addfile("/data2/jhson/era5/data/monthly_nc/pl_z_600_1979_2020_monthly.nc","r")  ;;[504,73,144]
   z600 = f_z->z
   f_z   = addfile("/data2/jhson/era5/data/monthly_nc/pl_z_500_1979_2020_monthly.nc","r")  ;;[504,73,144]
   z500 = f_z->z
   f_z   = addfile("/data2/jhson/era5/data/monthly_nc/pl_z_400_1979_2020_monthly.nc","r")  ;;[504,73,144]
   z400 = f_z->z

   ;Z = ((z850)/9.8)/1.
   ;Z = ((z700)/9.8)/1.
   Z = ((z500)/9.8)/1.
   ;Z = ((z400+z500+z600+z700+z850)/9.8)/5.

   HGT = reshape(Z,(/42,12,73,144/))
   HGT!0="year"
   HGT!1="month"
   HGT!2="latitude"
   HGT!3="longitude"
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; 

  posi_com = new((/12,73,144/),"float")
  nega_com = new((/12,73,144/),"float")
  diff_com = new((/12,73,144/),"float")
  t_val = new((/12,73,144/),"float")
  clim = new((/12,73,144/),"float")
  
  p_com_hgt = new((/73,144/),"float")
  n_com_hgt = new((/73,144/),"float")
  p_com_hgt_all = new((/30,73,144/),"float")
  n_com_hgt_all = new((/30,73,144/),"float")
  p_sum_hgt = new((/73,144/),"float")
  n_sum_hgt = new((/73,144/),"float")
  sd_hgt = new((/73,144/),"float")
  t_hgt = new((/73,144/),"float")
  diff_com_hgt = new((/73,144/),"float")

  do mon = 0, 12-1
    pc = index(:,mon)
    July_hgt = tofloat(HGT(:,mon,:,:))
    clim_hgt = dim_avg_n(July_hgt,0)
    ;print(ave_hgt)
    
    ;;;;;;cal anomaly
    ;do year = 0, 42-1 
    ;  July_hgt(year,:,:) = July_hgt(year,:,:) - clim_hgt(:,:)
    ;end do
    ;;;;;;;;;;;;;;;;;

    ;;;;remove trend;;;;;
    ;test = fspan(1,42,42)
    ;rc = regline(test,pc)    
    ;;print(test)
    ;;print(rc)
    ;y = rc*test + rc@yintercept
    ;;print(y)
    ;pc = pc - y
    ;;;;;;;;;;;;;;;;;;;;

    n2 = 0
    n1 = 0
    p_com_hgt(:,:) = 0.
    n_com_hgt(:,:) = 0.
    p_com_hgt_all(:,:,:) = 0.
    n_com_hgt_all(:,:,:) = 0.
    p_sum_hgt(:,:) = 0.
    n_sum_hgt(:,:) = 0.
    sd_hgt(:,:) = 0.
    t_hgt(:,:) = 0.
    diff_com_hgt(:,:) = 0.
    
    ;;;;above normal
    do t = 0, 42-1 
      ;if pc(t) .ge. 0.5 then 
      if pc(t) .ge. 0.75 then 
      ;if pc(t) .ge. 1.0 then 
        p_com_hgt(:,:) = p_com_hgt(:,:) + July_hgt(t,:,:)
        p_com_hgt_all(n2,:,:) = July_hgt(t,:,:)
        n2 = n2+1
      end if
    end do
    p_com_hgt = p_com_hgt / n2
    ;;;;;;;;;;;;;;;;;;

    ;;;;below normal
    do t = 0, 42-1    
      ;if pc(t) .le. -0.5 then
      if pc(t) .le. -0.75 then
      ;if pc(t) .le. -1.0 then
        n_com_hgt(:,:) = n_com_hgt(:,:) + July_hgt(t,:,:)
        n_com_hgt_all(n1,:,:) = July_hgt(t,:,:)
        n1 = n1+1
      end if
    end do
    n_com_hgt = n_com_hgt / n1
    ;;;;;;;;;;;;;;;;;;

    diff_com_hgt = p_com_hgt - n_com_hgt

    ;;;;for the T-test
    do n = 0, n2-1 
      p_com_hgt_all(n,:,:) = p_com_hgt_all(n,:,:) - p_com_hgt(:,:)
    end do
    do n = 0, n1-1 
      n_com_hgt_all(n,:,:) = n_com_hgt_all(n,:,:) - n_com_hgt(:,:)
    end do

    p_com_hgt_all = p_com_hgt_all^2
    n_com_hgt_all = n_com_hgt_all^2


    p_sum_hgt = dim_sum_n(p_com_hgt_all,0) ;sum n-dimension
    n_sum_hgt = dim_sum_n(n_com_hgt_all,0)


    sd_hgt(:,:) = (((p_sum_hgt(:,:) + n_sum_hgt(:,:))/(n2+n1-2))*(1./n2 + 1./n1))^(1/2.)

    t_hgt = diff_com_hgt / sd_hgt
    ;;;;;;;;;;;;;;;;;;;

  posi_com(mon,:,:) = p_com_hgt
  nega_com(mon,:,:) = n_com_hgt
  diff_com(mon,:,:) = diff_com_hgt
  t_val(mon,:,:) = t_hgt
  clim(mon,:,:) = clim_hgt
  end do  ;mon loop

;;;write nc file
system("rm -f /data2/jhson/era5/program_for_using_EASM_theory/11_HGT_composite_uwing_uwnd/HGT_composite.nc")
fout_hgt = addfile ("/data2/jhson/era5/program_for_using_EASM_theory/11_HGT_composite_uwing_uwnd/HGT_composite.nc","c")
setfileoption(fout_hgt,"DefineMode",True)

fAtt               = True            ; assign file attributes
fAtt@title         = "Composite resut"
fAtt@source_file   =  "Geopotential height HGT"
fAtt@Conventions   = "None"
fAtt@creation_date = systemfunc ("date")
fileattdef( fout_hgt, fAtt )            ; copy file attributes


dimNames = (/"month", "latitude", "longitude"/)
dimSizes = (/ -1    ,  73,  144/)
dimUnlim = (/ True  , False, False/)
filedimdef(fout_hgt,dimNames,dimSizes,dimUnlim)

filevardef(fout_hgt, "month"     ,"float", (/"month"/))
filevardef(fout_hgt, "latitude"  ,"float", (/"latitude"/))
filevardef(fout_hgt, "longitude" ,"float", (/"longitude"/))
filevardef(fout_hgt, "posi"  ,"float",(/"month","latitude","longitude"/))
filevardef(fout_hgt, "nega"  ,"float",(/"month","latitude","longitude"/))
filevardef(fout_hgt, "diff"  ,"float",(/"month","latitude","longitude"/))
filevardef(fout_hgt, "t_val"     ,"float",(/"month","latitude","longitude"/))
filevardef(fout_hgt, "clim"      ,"float",(/"month","latitude","longitude"/))

time = fspan(1,12,12)
time@long_name = "Month"
lon@long_name = "Longitude"
lat@long_name = "Latitude"
posi_com@long_name = "Positive composite"
nega_com@long_name = "Negative composite"
diff_com@long_name = "Composite difference posi. - nega."
t_val@long_name = "T value"
clim@lon_name = "Climatology"


filevarattdef(fout_hgt,"month" ,time)                    ; copy time attributes
filevarattdef(fout_hgt,"latitude"  ,lat)                 ; copy lat attributes
filevarattdef(fout_hgt,"longitude"  ,lon)                ; copy lon attributes
filevarattdef(fout_hgt,"posi",posi_com)                        ; copy T attributes
filevarattdef(fout_hgt,"nega",nega_com)                        ; copy T attributes
filevarattdef(fout_hgt,"diff",diff_com)                        ; copy T attributes
filevarattdef(fout_hgt,"t_val",t_val)                        ; copy T attributes
filevarattdef(fout_hgt,"clim",clim)                        ; copy T attributes

setfileoption(fout_hgt,"DefineMode",False)

;print(time)
;print(lat)

fout_hgt->time=(/time/)
fout_hgt->latitude=(/lat/)
fout_hgt->longitude=(/lon/)
fout_hgt->posi=(/posi_com/)
fout_hgt->nega=(/nega_com/)
fout_hgt->diff=(/diff_com/)
fout_hgt->t_val=(/t_val/)
fout_hgt->clim=(/clim/)

end



