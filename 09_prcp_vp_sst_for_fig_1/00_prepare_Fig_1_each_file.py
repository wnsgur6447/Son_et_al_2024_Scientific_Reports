#-- import modules
import numpy as np
import matplotlib.pyplot as plt
import Nio
import os
from netCDF4 import Dataset    # Note: python is case-sensitive!

fname = "/data2/jhson/monthly_GPCP/data/GPCP_1979_2022_3_monthly_144x73.nc"
f = Nio.open_file(fname)
precip = f.variables["precip"][:,:,:]
prcp_temp = np.zeros((43,12,73,144),dtype=float)
prcp_temp = precip[0:516,:,:].reshape(43,12,73,144)
f.close()

prcp = np.zeros((43,12,73,144),dtype=float)
for j in range(0,73):
  prcp[:,:,j,:] = prcp_temp[:,:,72-j,:]

fname = "/data2/jhson/HadISST_ICE/data/HadISST_sst_1979_2022_02.nc"
f = Nio.open_file(fname)
HadiSST = f.variables["sst"][:,:,:]
sst = np.zeros((43,12,180,360),dtype=float)
sst = HadiSST[0:516,:,:].reshape(43,12,180,360)
f.close()

fname = "/data2/jhson/era5/data/monthly_nc/pl_vp_200_1979_2021_monthly.nc"
f = Nio.open_file(fname)
vel_pot = f.variables["vp"][:,:,:]
vp = np.zeros((43,12,73,144),dtype=float)
vp = vel_pot.reshape(43,12,73,144)
f.close()


index= np.zeros((43,12),dtype=float)
for mon in range(0,12):
  for year in range(0,43):
    index[year,mon] = np.mean(prcp[year,mon,26:34,28:36]) #5~25N, 70~90E


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


#-write indices to netcdf
# Define variables
lon_144 = np.arange(144)*2.5
lat_73 = 90 - np.arange(73)*2.5
lon_360 = np.arange(360)-179.5
lat_180 = 89.5 - np.arange(180)
mon_12 = np.arange(12)+1
time_43 = np.arange(43)+1979

##########################for 144x73
try: ncfile.close()  # just to be safe, make sure dataset is not already open.
except: pass
ncfile = Dataset('./final_144_73_12_for_Fig_1.nc',mode='w',format='NETCDF4_CLASSIC')

lon_144_dim = ncfile.createDimension('longitude_144', 144)
lat_73_dim = ncfile.createDimension('latitude_73', 73) 
mon_12_dim = ncfile.createDimension('month_12', 12)

ncfile.title='final output'
ncfile.subtitle="144x73x12"

# Define variables
longitude_144 = ncfile.createVariable('longitude_144',np.float32,('longitude_144')) # note: unlimited dimension is leftmost
longitude_144.standard_name = 'Longitude_144' # this is a CF standard name   
longitude_144[:] = np.array(lon_144[:])#dimension expression is in sensitive

latitude_73 = ncfile.createVariable('latitude_73',np.float32,('latitude_73')) # note: unlimited dimension is leftmost
latitude_73.standard_name = 'Latitude_73' # this is a CF standard name   
latitude_73[:] = np.array(lat_73[:])#dimension expression is in sensitive

month_12 = ncfile.createVariable('month_12',np.float32,('month_12')) # note: unlimited dimension is leftmost
month_12.standard_name = 'Month' # this is a CF standard name
month_12[:] = np.array(mon_12[:])

vp_corr = ncfile.createVariable('vp_corr',np.float32,('month_12','latitude_73','longitude_144')) # note: unlimited dimension is leftmost
vp_corr.standard_name = 'Velocity Potential correlation'
vp_corr[:,:,:] = np.array(corr_vp[:,:,:])

prcp_clim = ncfile.createVariable('prcp_clim',np.float32,('month_12','latitude_73','longitude_144')) # note: unlimited dimension is leftmost
prcp_clim.standard_name = 'PRCP climatology'
prcp_clim[:,:,:] = np.array(clim_prcp[:,:,:])

prcp_std = ncfile.createVariable('prcp_std',np.float32,('month_12','latitude_73','longitude_144')) # note: unlimited dimension is leftmost
prcp_std.standard_name = 'PRCP stddev'
prcp_std[:,:,:] = np.array(std_prcp[:,:,:])

ncfile.close(); print('Dataset is closed!')

##########################for 360x180
try: ncfile.close()  # just to be safe, make sure dataset is not already open.
except: pass
ncfile = Dataset('./final_360_180_12_for_Fig_1.nc',mode='w',format='NETCDF4_CLASSIC')
lon_360_dim = ncfile.createDimension('longitude', 360)
lat_180_dim = ncfile.createDimension('latitude', 180) 
mon_12_dim = ncfile.createDimension('month_12', 12)

ncfile.title='final output'
ncfile.subtitle="360x180x12"

longitude_360 = ncfile.createVariable('longitude',np.float32,('longitude')) # note: unlimited dimension is leftmost
longitude_360.standard_name = 'Longitude' # this is a CF standard name   
longitude_360[:] = np.array(lon_360[:])#dimension expression is in sensitive

latitude_180 = ncfile.createVariable('latitude',np.float32,('latitude')) # note: unlimited dimension is leftmost
latitude_180.standard_name = 'Latitude' # this is a CF standard name   
latitude_180[:] = np.array(lat_180[:])#dimension expression is in sensitive

month_12 = ncfile.createVariable('month_12',np.float32,('month_12')) # note: unlimited dimension is leftmost
month_12.standard_name = 'Month' # this is a CF standard name
month_12[:] = np.array(mon_12[:])

sst_corr = ncfile.createVariable('sst_corr',np.float32,('month_12','latitude','longitude')) # note: unlimited dimension is leftmost
sst_corr.standard_name = 'SST correlation'
sst_corr[:,:,:] = np.array(corr_sst[:,:,:])

ncfile.close(); print('Dataset is closed!')

##########################for index
try: ncfile.close()  # just to be safe, make sure dataset is not already open.
except: pass
ncfile = Dataset('./final_index_for_Fig_1.nc',mode='w',format='NETCDF4_CLASSIC')

year_43_dim = ncfile.createDimension('year_43', None) # unlimited axis (can be appended to).
mon_12_dim = ncfile.createDimension('month_12', 12)

year_43 = ncfile.createVariable('year_43',np.float32,('year_43')) # note: unlimited dimension is leftmost
year_43.standard_name = 'Year' # this is a CF standard name
year_43[:] = np.array(time_43[:])

prcp_index = ncfile.createVariable('prcp_index',np.float32,('year_43','month_12')) # note: unlimited dimension is leftmost
prcp_index.standard_name = 'Indian PRCP index'
prcp_index[:,:] = np.array(index[:,:])

ncfile.close(); print('Dataset is closed!')

##########################for clim index
try: ncfile.close()  # just to be safe, make sure dataset is not already open.
except: pass
ncfile = Dataset('./final_clim_index_for_Fig_1.nc',mode='w',format='NETCDF4_CLASSIC')

mon_12_dim = ncfile.createDimension('month_12', 12)

prcp_index_clim_mean = ncfile.createVariable('prcp_index_clim_mean',np.float32,('month_12')) # note: unlimited dimension is leftmost
prcp_index_clim_mean.standard_name = 'Indian PRCP index climate mean'
prcp_index_clim_mean[:] = np.array(clim_mean_index[:])

prcp_index_clim_std = ncfile.createVariable('prcp_index_clim_std',np.float32,('month_12')) # note: unlimited dimension is leftmost
prcp_index_clim_std.standard_name = 'Indian PRCP index climate std'
prcp_index_clim_std[:] = np.array(clim_std_index[:])
ncfile.close(); print('Dataset is closed!')

#print(ncfile)
exit()
