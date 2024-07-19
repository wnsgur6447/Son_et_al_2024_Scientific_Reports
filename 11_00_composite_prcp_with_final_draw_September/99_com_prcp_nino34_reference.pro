close, /all

;restore, '../33_Webster_and_Yang_index/WYM.sav'
;restore, '../32_IM_index/IMI.sav'
;aaaa = WYM
;aaaa = IMI

restore, '../17_00_index_corr_with_chi200/com_index.sav'  ;temp_index(36)
;restore, '../17_00_index_corr_with_chi200/Chi_minus_oni.sav'  ;temp_index(36)

restore, '../10_ONI_index/oni.sav'  ;oni[12,36], 1979~2014

;openr, 2, '/das_b/jhson/nino/data/nino3.bin'
;openr, 2, '/das_b/jhson/nino/data/nino34.bin'
;openr, 2, '/das_b/jhson/nino/data/nino4.bin'
;nino = fltarr(36,12)
;readu, 2, nino

restore, '/das_b/jhson/nino/program/nino34.sav'

for year = 0, 36-1 do begin
;  oni(*,year) = nino(year,*)
  oni(*,year) = nino34(year,*)
endfor


openr, 1, '/das_b/jhson/monthly_gpcp/data/bin/gpcp_1979_2014.intpl'
data = fltarr(144,73,12,36)
readu, 1, data

temp = fltarr(144,73,12,36)
temp = data

clim = fltarr(144,73,12)
for x = 0, 144-1 do begin
for y = 0, 73-1 do begin
for mon = 0, 12-1 do begin
  clim(x,y,mon) = mean(temp(x,y,mon,*))
endfor
endfor
endfor

for x = 0, 144-1 do begin
for y = 0, 73-1 do begin
for mon = 0, 12-1 do begin
  data(x,y,mon,*) = data(x,y,mon,*) - clim(x,y,mon)
endfor
endfor
endfor

yy1 = fltarr(36)
yy2 = fltarr(36)
yy1(*) = !values.f_nan
yy2(*) = !values.f_nan

for year = 0, 36-1 do begin
  if temp_index(year) ge 1 then begin
;  if temp_index(year) ge 0.5 then begin
;  if temp_index(year) ge 0.75 then begin
;  if temp_index(year) ge 0 then begin
;  if temp_index(year) ge 0 and temp_index(year) lt 1 then begin
;  if temp_index(year) ge 0 and year ne 18 and year ne 19 then begin
;  if temp_index(year) le 1 and temp_index(year) ge -1 then begin
    yy1(year) = 1
  endif

  if temp_index(year) le -1 then begin
;  if temp_index(year) le -0.5 then begin
;  if temp_index(year) le -0.75 then begin
;  if temp_index(year) le 0 then begin
;  if temp_index(year) le 0 and temp_index(year) gt -1 then begin
;  if temp_index(year) le 0 and year ne 18 and year ne 19 then begin
    yy2(year) = 1
  endif
endfor

num1 = total(yy1, /nan)
num2 = total(yy2, /nan)
;oni1 = fltarr(num1)
;oni2 = fltarr(num2)
data1 = fltarr(144,73,12,num1)
data2 = fltarr(144,73,12,num2)

num11 = 0
num22 = 0
for year = 0, 36-1 do begin
  if yy1(year) ge 1 then begin
    for x = 0, 144-1 do begin
    for y = 0, 73-1 do begin
    for mon = 0, 12-1 do begin
      data1(x,y,mon,num11) = data(x,y,mon,year)
    endfor
    endfor
    endfor
    num11 = num11 + 1
  endif

  if yy2(year) le 1 then begin
    for x = 0, 144-1 do begin
    for y = 0, 73-1 do begin
    for mon = 0, 12-1 do begin
      data2(x,y,mon,num22) = data(x,y,mon,year)
    endfor
    endfor
    endfor
    num22 = num22 + 1
  endif
endfor

print, num11, num22

clim1 = fltarr(144,73,12)
clim2 = fltarr(144,73,12)

std1 = fltarr(144,73,12)
std2 = fltarr(144,73,12)

for x = 0, 144-1 do begin
for y = 0, 73-1 do begin
for mon = 0, 12-1 do begin
  clim1(x,y,mon) = mean(data1(x,y,mon,*))
  clim2(x,y,mon) = mean(data2(x,y,mon,*))

  std1(x,y,mon) = stddev(data1(x,y,mon,*))
  std2(x,y,mon) = stddev(data2(x,y,mon,*))
endfor
endfor
endfor

t1 = fltarr(144,73,12)
t2 = fltarr(144,73,12)

for x = 0, 144-1 do begin
for y = 0, 73-1 do begin
for mon = 0, 12-1 do begin
  t1(x,y,mon) = clim1(x,y,mon) / (std1(x,y,mon) / sqrt(num11))
  t2(x,y,mon) = clim2(x,y,mon) / (std2(x,y,mon) / sqrt(num22))
endfor
endfor
endfor

temp1 = fltarr(144,73,12,num11)
temp2 = fltarr(144,73,12,num22)

for n = 0, num11-1 do begin
  temp1(*,*,*,n) = data1(*,*,*,n) - clim1(*,*,*)
endfor

for n = 0, num22-1 do begin
  temp2(*,*,*,n) = data2(*,*,*,n) - clim2(*,*,*)
endfor

temp1(*,*,*,*) = temp1(*,*,*,*)^2
temp2(*,*,*,*) = temp2(*,*,*,*)^2

temp1_ave = fltarr(144,73,12)
temp2_ave = fltarr(144,73,12)

for x = 0, 144-1 do begin
for y = 0, 73-1 do begin
for mon = 0, 12-1 do begin
  temp1_ave(x,y,mon) = total(temp1(x,y,mon,*))
  temp2_ave(x,y,mon) = total(temp2(x,y,mon,*))
endfor
endfor
endfor

sd_diff = fltarr(144,73,12)
sd_diff(*,*,*) = sqrt(((temp1_ave(*,*,*) + temp2_ave(*,*,*))/(num11+num22-2))*(1./num11 + 1./num22))

;t_diff = (clim1 - clim2) / sd_diff
t_diff = (clim2 - clim1) / sd_diff

;openw, 21, 'clim1.bin'
;writeu, 21, data1
;writeu, 21, clim1

;openw, 22, 'clim2.bin'
;writeu, 22, data2
;writeu, 22, clim2

openw, 31, 'com1.bin'
writeu, 31, clim1
writeu, 31, t1

openw, 32, 'com2.bin'
writeu, 32, clim2
writeu, 32, t2

openw, 33, 'com_diff.bin'
;writeu, 33, clim1-clim2
writeu, 33, clim2-clim1
writeu, 33, t_diff


close, /all

stop
end
