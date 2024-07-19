#-- import modules
import numpy as np
import matplotlib.pyplot as plt
import Nio
import os
from netCDF4 import Dataset    # Note: python is case-sensitive!

#fname = "/data2/jhson/monthly_GPCP/data/GPCP_1979_2022_3_monthly_144x73.nc"
fname = "/Users/jun-hyeokson/research/GPCP/data/GPCP_144_73_1979_2023_09_monthly.nc"
f = Nio.open_file(fname)
precip = f.variables["precip"][:,:,:]
prcp_temp = np.zeros((43,12,73,144),dtype=float)
prcp_temp = precip[0:516,:,:].reshape(43,12,73,144)
f.close()

prcp = np.zeros((43,12,73,144),dtype=float)
for j in range(0,73):
  prcp[:,:,j,:] = prcp_temp[:,:,72-j,:]

#fname = "/data2/jhson/HadISST_ICE/data/HadISST_sst_1979_2022_02.nc"
fname = "/Users/jun-hyeokson/research/HadISST/data/HadiSST_1979_2022_monthly.nc"
f = Nio.open_file(fname)
HadiSST = f.variables["sst"][:,:,:]
sst = np.zeros((43,12,180,360),dtype=float)
sst = HadiSST[0:516,:,:].reshape(43,12,180,360)
f.close()

#fname = "/data2/jhson/era5/data/monthly_nc/pl_vp_200_1979_2021_monthly.nc"
fname = "/Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_vp_200_1979_2022_monthly.nc"
f = Nio.open_file(fname)
vel_pot = f.variables["vp"][:,:,:]
vp = np.zeros((43,12,73,144),dtype=float)
vp = vel_pot[0:516,:,:].reshape(43,12,73,144)
f.close()


index= np.zeros((43,12),dtype=float)
for mon in range(0,12):
  for year in range(0,43):
    #index[year,mon] = np.mean(prcp[year,mon,26:34,28:36]) #5~25N, 70~90E
    index[year,mon] = np.mean(prcp[year,mon,26:34,28:36]) #5~25N, 70~90E

vp_index= np.zeros((43,12),dtype=float)
for mon in range(0,12):
  for year in range(0,43):
    vp_index[year,mon] = np.mean(vp[year,mon,26:34,28:36]) #5~25N, 70~90E


yy = np.zeros((43,3),dtype=float)
yy[:,:] = np.nan
#yy[:,:] = 0

clim_prcp = np.zeros((12,73,144),dtype=float)
std_prcp = np.zeros((12,73,144),dtype=float)

corr_sst = np.zeros((12,180,360),dtype=float)
corr_vp = np.zeros((12,73,144),dtype=float)


for mon in range(0,12):
  for j in range(0,73):
    for i in range(0,144):
      clim_prcp[mon,j,i] = np.mean(prcp[:,mon,j,i])
      std_prcp[mon,j,i] = np.std(prcp[:,mon,j,i])
      corr_temp = np.corrcoef(index[:,mon],vp[:,mon,j,i])
      corr_vp[mon,j,i] = corr_temp[1,0]

for mon in range(0,12):
  for j in range(0,180):
    for i in range(0,360):
      corr_temp = np.corrcoef(index[:,mon],sst[:,mon,j,i])
      corr_sst[mon,j,i] = corr_temp[1,0]

clim_mean_index= np.zeros((12),dtype=float)
clim_std_index= np.zeros((12),dtype=float)
for mon in range(0,12):
  clim_mean_index[mon] = np.mean(clim_prcp[mon,26:34,28:36]) 
  clim_std_index[mon] = np.mean(std_prcp[mon,26:34,28:36]) 

for lag in range(0,13):
  print(np.corrcoef(index[0+lag:30+lag,7-1],vp_index[0+lag:30+lag,7-1]))

#-write indices to netcdf
# Define variables
lon_144 = np.arange(144)*2.5
lat_73 = 90 - np.arange(73)*2.5
lon_360 = np.arange(360)-179.5
lat_180 = 89.5 - np.arange(180)
mon_12 = np.arange(12)+1
time_43 = np.arange(43)+1979

##########################for 144x73
f = open('corr_vp.bin', 'wb')
f.write(np.array(corr_vp[:,:,:], dtype='f4'))
f.close()

f = open('clim_prcp.bin', 'wb')
f.write(np.array(clim_prcp[:,:,:], dtype='f4'))
f.close()

f = open('std_prcp.bin', 'wb')
f.write(np.array(std_prcp[:,:,:], dtype='f4'))
f.close()

##########################for 360x180
f = open('corr_sst.bin', 'wb')
f.write(np.array(corr_sst[:,:,:], dtype='f4'))
f.close()

##########################for index
f = open('prcp_index.bin', 'wb')
f.write(np.array(index[:,7-1], dtype='f4'))   #43
f.close()

##########################for clim index
f = open('prcp_clim_index.bin', 'wb')
f.write(np.array(clim_mean_index[:], dtype='f4'))   #12
f.close()

temp= np.zeros((12),dtype=float)
temp[:] = np.nan
temp[7-1] = clim_mean_index[7-1]

f = open('prcp_clim_index_july.bin', 'wb')
f.write(np.array(temp[:], dtype='f4'))   #12
f.close()

f = open('prcp_std_index.bin', 'wb')
f.write(np.array(clim_std_index[:], dtype='f4'))   #12
f.close()

#print(ncfile)
exit()
