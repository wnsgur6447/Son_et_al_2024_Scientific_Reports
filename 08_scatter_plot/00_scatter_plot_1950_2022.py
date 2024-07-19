#-- import modules
import xarray as xr
import numpy as np
import matplotlib.pyplot as plt
import Nio
import os
from netCDF4 import Dataset    # Note: python is case-sensitive!


#--NINO3.4 index data file name
#-- open file
#fname = "/data2/jhson/climate_indices/program/00_make_nc/NINO3.4.nc"
fname = "/Users/jun-hyeokson/research/climate_indices/program/00_make_nc/NINO3.4_1950_2022.nc"
f = Nio.open_file(fname)
#ds = Nio.open_file(fname)


#-- retrieve the variables stored in file
#print(os.system('ncdump -c /Users/jun-hyeokson/research/climate_indices/program/00_make_nc/NINO3.4_1950_2022.nc'))

#-- read variable, first time step
nino = f.variables["nino"][:]
time = f.variables["time"][:]
#print(nino.shape)

nino = nino.reshape(73,12)

#--close ncfile
f.close()

#print(nino.shape)
#print(nino)

#fname = "/data2/jhson/era5/data/daily_nc/pl_vp_200_1979_2021_daily.nc"
#fname = "/data2/jhson/era5/data/monthly_nc/pl_vp_200_1979_2021_monthly.nc"
fname = "/Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_vp_200_1940_2022_monthly.nc"
f = Nio.open_file(fname)
vel_pot = f.variables["vp"][:,:,:]
#data = vel_pot.reshape(43,365,73,144)
data = vel_pot.reshape(83,12,73,144)

#--close ncfile
f.close()

#temp = np.zeros((43,12,73,144),dtype=float)
temp = np.zeros((73,12,73,144),dtype=float)
#for i in range(0,144): 
#  for j in range(0,73):
#    for yyyy in range(0,43):
#      temp[yyyy,1-1,j,i] = np.mean(data[yyyy,1-1:31,j,i])
#      temp[yyyy,2-1,j,i] = np.mean(data[yyyy,32-1:59,j,i])
#      temp[yyyy,3-1,j,i] = np.mean(data[yyyy,60-1:90,j,i])
#      temp[yyyy,4-1,j,i] = np.mean(data[yyyy,91-1:120,j,i])
#      temp[yyyy,5-1,j,i] = np.mean(data[yyyy,121-1:151,j,i])
#      temp[yyyy,6-1,j,i] = np.mean(data[yyyy,152-1:181,j,i])
#      temp[yyyy,7-1,j,i] = np.mean(data[yyyy,182-1:212,j,i])
#      temp[yyyy,8-1,j,i] = np.mean(data[yyyy,213-1:243,j,i])
#      temp[yyyy,9-1,j,i] = np.mean(data[yyyy,244-1:273,j,i])
#      temp[yyyy,10-1,j,i] = np.mean(data[yyyy,274-1:304,j,i])
#      temp[yyyy,11-1,j,i] = np.mean(data[yyyy,305-1:334,j,i])
#      temp[yyyy,12-1,j,i] = np.mean(data[yyyy,335-1:365,j,i])
temp = data[10:83,:,:,:]

clim = np.zeros((12,73,144),dtype=float)
for i in range(0,144):
  for j in range(0,73):
    for mon in range(0,12):
      clim[mon,j,i] = np.mean(temp[:,mon,j,i])

index= np.zeros((73,12),dtype=float)
for mon in range(0,12):
  for year in range(0,73):
    #index[year,mon] = np.mean(temp[year,mon,36:44,28:36]) #70~90E, EQ~20N org
    index[year,mon] = np.mean(temp[year,mon,36:44,26:36]) #70~90E, EQ~25N 


ave = np.zeros((12),dtype=float)
std = np.zeros((12),dtype=float)

#--normalization for index
for mon in range(0,12):
  ave[mon] = np.mean(index[29:72,mon])
  std[mon] = np.std(index[29:72,mon])

for mon in range(0,12):
  index[:,mon] = (index[:,mon]-ave[mon])/std[mon]

#--normalization for nino
for mon in range(0,12):
  ave[mon] = np.mean(nino[29:72,mon])
  std[mon] = np.std(nino[29:72,mon])

for mon in range(0,12):
  nino[:,mon] = (nino[:,mon]-ave[mon])/std[mon]

temp_index = np.zeros((73),dtype=float)
temp_index = index[:,7-1] - nino[:,7-1]

yy = np.zeros((73,3),dtype=float)
yy[:,:] = np.nan
#yy[:,:] = 0

index_temp = np.zeros((43),dtype=float) #number of normal years
nino_temp = np.zeros((43),dtype=float)  #number of normal years
temp_num = 0

year_temp = np.arange(73)

for year in range(0,73):
  #if temp_index[year] >= 1:
  if temp_index[year] >= 0.75:
  #if temp_index[year] >= 0.5:
    yy[year,0] = 1
    print('red:',year_temp[year],year_temp[year]+1950)
  #elif temp_index[year] <= -1:
  elif temp_index[year] <= -0.75:
  #elif temp_index[year] <= -0.5:
    yy[year,1] = 1
    print('blue:',year_temp[year],year_temp[year]+1950)
  else:
    yy[year,2] = 1
    index_temp[temp_num] = index[year,7-1]
    nino_temp[temp_num] = nino[year,7-1]
    temp_num = temp_num+1

print(temp_num)

print(np.corrcoef(nino[:,7-1],index[:,7-1]))
print(np.corrcoef(nino_temp[:],index_temp[:]))

num = [np.nansum(yy[:,0]),np.nansum(yy[:,1]),np.nansum(yy[:,2])]
print(num)

nino0 = np.zeros(np.int32(num[0]))
nino1 = np.zeros(np.int32(num[1]))
nino2 = np.zeros(np.int32(num[2]))

nino0[:] = np.nan
nino1[:] = np.nan
nino2[:] = np.nan

index0 = np.zeros(np.int32(num[0]))
index1 = np.zeros(np.int32(num[1]))
index2 = np.zeros(np.int32(num[2]))

index0[:] = np.nan
index1[:] = np.nan
index2[:] = np.nan

num0 = 0
num1 = 0
num2 = 0

for year in range(0,73):
  if yy[year,0] == 1:
    nino0[num0] = nino[year,7-1]
    index0[num0] = index[year,7-1]
    num0 = num0+1
  elif yy[year,1] == 1:
    nino1[num1] = nino[year,7-1]
    index1[num1] = index[year,7-1]
    num1 = num1+1
  else:
    nino2[num2] = nino[year,7-1]
    index2[num2] = index[year,7-1]
    num2 = num2+1

for t in range(42):
  print('moving',t,np.corrcoef(nino[0+t:31+t,7-1],index[0+t:31+t,7-1]))

#-write indices to netcdf
try: ncfile.close()  # just to be safe, make sure dataset is not already open.
except: pass
ncfile = Dataset('./final_index_1950_2022.nc',mode='w',format='NETCDF4_CLASSIC')
print(ncfile)

time_dim = ncfile.createDimension('time', None) # unlimited axis (can be appended to).

ncfile.title='final_index 1950~2020'
ncfile.subtitle="Normalized NINO3.4 - CHI200 index"

# Define variables
time = ncfile.createVariable('time', np.float32, ('time',))
final_index = ncfile.createVariable('final_index',np.float32,('time')) # note: unlimited dimension is leftmost

final_index.units = 'K' # degrees Kelvin
final_index.standard_name = 'Normalized NINO3.4 - CHI200 index' # this is a CF standard name

ntimes = 73
#nino = np.zeros((516),dtype=float)
time[:] = np.arange(73)+1950
#final_index[:] = temp_index.reshape(43)
final_index[:] = temp_index[:]

print(ncfile)
ncfile.close(); print('Dataset is closed!')



#-draw scatter plot  
plt.plot(nino2[:],index2[:],'o',color='black',markersize=10)

back_x = np.arange(9)-4
back_y = np.arange(9)-4
plt.plot(back_x,back_y,color='gray',linewidth=2)
plt.plot(back_x,back_y+0.75,':',color='gray',linewidth=2)
plt.plot(back_x,back_y-0.75,':',color='gray',linewidth=2)

m,b = np.polyfit(nino2[:],index2,1)
#plt.plot(nino2[:],m*nino2[:]+b,color='yellowgreen',linewidth=2)
plt.plot(nino0[:],index0[:],'o',color='red',markersize=10)
plt.plot(nino1[:],index1[:],'o',color='blue',markersize=10)

axes=plt.axes()
axes.set_xlim([-3,3])
axes.set_ylim([-3,3])

#plt.title('Normalized NINO3.4 and Indian Chi index in July',fontsize=14)
plt.xlabel('NINO3.4',fontsize=14)
plt.ylabel('Velocity potential at 200 hPa',fontsize=14)
plt.show()

exit()

