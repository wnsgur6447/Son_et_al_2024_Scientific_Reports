#-- import modules
import numpy as np
import matplotlib.pyplot as plt
import Nio
import os
from netCDF4 import Dataset    # Note: python is case-sensitive!

#fname = "/data2/jhson/climate_indices/program/00_make_nc/NINO3.4.nc"
fname = "/Users/jun-hyeokson/research/climate_indices/program/00_make_nc/NINO3.4.nc"
f = Nio.open_file(fname)
nino_temp = f.variables["nino"][:]
nino = np.zeros((43,12),dtype=float)
nino = nino_temp[0:516].reshape(43,12)
f.close()

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

#fname = "/data2/jhson/era5/data/monthly_nc/pl_z_925_1979_2021_monthly.nc"
fname = "/Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_z_850_1979_2022_monthly.nc"
f = Nio.open_file(fname)
hgt = f.variables["z"][:,:,:]
z = np.zeros((43,12,73,144),dtype=float)
z_temp = hgt.reshape(44,12,73,144)
z = z_temp[0:43,:,:,:]
f.close()

#fname = "/data2/jhson/era5/data/monthly_nc/pl_u_925_1979_2021_monthly.nc"
fname = "/Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_u_925_1979_2022_monthly.nc"
f = Nio.open_file(fname)
uwnd = f.variables["u"][:,:,:]
u = np.zeros((43,12,73,144),dtype=float)
u_temp = uwnd.reshape(44,12,73,144)
u = u_temp[0:43,:,:,:]
f.close()

#fname = "/data2/jhson/era5/data/monthly_nc/pl_v_925_1979_2021_monthly.nc"
fname = "/Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_v_925_1979_2022_monthly.nc"
f = Nio.open_file(fname)
vwnd = f.variables["v"][:,:,:]
v = np.zeros((43,12,73,144),dtype=float)
v_temp = vwnd.reshape(44,12,73,144)
v = v_temp[0:43,:,:,:]
f.close()

#fname = "/data2/jhson/era5/program_ENSO_Indian/08_scatter_plot/final_index.nc"
fname = "/Users/jun-hyeokson/research/ERA5/program_ENSO_Indian/08_scatter_plot_August/final_index.nc"
f = Nio.open_file(fname)
final_index_temp = f.variables["final_index"][:]
final_index = np.array(final_index_temp[:],dtype=float)
f.close()

red = 10
blue = 6
normal = 27
month = 8-1


yy = np.zeros((43,12),dtype='float32')
year_temp = np.arange(43)

prcp_index_mid = np.zeros((normal),dtype='float32')
nino_index_mid = np.zeros((normal),dtype='float32')

prcp_anom = np.zeros((43,12,73,144),dtype='float32')
prcp_clim = np.zeros((12,73,144),dtype='float32')
for i in range(0,144):
  for j in range(0,73):
    for mon in range(0,12):
      prcp_clim[mon,j,i] = np.mean(prcp[:,mon,j,i])
      prcp_anom[:,mon,j,i] = prcp[:,mon,j,i] - prcp_clim[mon,j,i]

prcp_mid = np.zeros((normal,73,144),dtype='float32')

prcp_p = np.zeros((red,73,144),dtype='float32')
prcp_n = np.zeros((blue,73,144),dtype='float32')

num_mid = 0
num_p = 0
num_n = 0

for year in range(0,43):
  if final_index[year] >= 0.75:
    yy[year,0] = 1
    #print('red:',year_temp[year],year_temp[year]+1979)
    prcp_p[num_p,:,:] = prcp_anom[year,month,:,:]
    num_p = num_p+1    
  elif final_index[year] <= -0.75:
    yy[year,1] = 1
    #print('blue:',year_temp[year],year_temp[year]+1979)
    prcp_n[num_n,:,:] = prcp_anom[year,month,:,:]
    num_n = num_n+1    
  else:
    yy[year,2] = 1
    nino_index_mid[num_mid] = nino[year,month]
    prcp_mid[num_mid,:,:] = prcp_anom[year,month,:,:]
    num_mid = num_mid+1

####composite analysis
t_p_prcp = np.zeros((73,144),dtype='float32')
t_n_prcp = np.zeros((73,144),dtype='float32')
t_diff_prcp = np.zeros((73,144),dtype='float32')

#ave_mid = np.zeros((73,144),dtype='float32')
ave_p = np.zeros((73,144),dtype='float32')
ave_n = np.zeros((73,144),dtype='float32')

std_mid = np.zeros((73,144),dtype='float32')
std_p = np.zeros((73,144),dtype='float32')
std_n = np.zeros((73,144),dtype='float32')

for i in range(0,144):
  for j in range(0,73):
#    ave_mid[j,i] = np.mean(prcp_mid[:,j,i])
    ave_p[j,i] = np.mean(prcp_p[:,j,i])
    ave_n[j,i] = np.mean(prcp_n[:,j,i])

    #std_mid[j,i] = np.std(prcp_mid[:,j,i])
    std_mid[j,i] = np.std(prcp_anom[:,month,j,i])
    std_p[j,i] = np.std(prcp_p[:,j,i])
    std_n[j,i] = np.std(prcp_n[:,j,i])

for i in range(0,144):
  for j in range(0,73):
    t_p_prcp[j,i] = ave_p[j,i] / (std_p[j,i] / np.sqrt(num_p))
    t_n_prcp[j,i] = ave_n[j,i] / (std_n[j,i] / np.sqrt(num_n))

temp_p = np.zeros((np.int32(num_p),73,144),dtype='float32')
temp_n = np.zeros((np.int32(num_n),73,144),dtype='float32')
temp_ave_p = np.zeros((np.int32(num_p),73,144),dtype='float32')
temp_ave_n = np.zeros((np.int32(num_n),73,144),dtype='float32')
sd_diff = np.zeros((73,144),dtype='float32')

for n in range(0,np.int32(num_p)):
  temp_p[n,:,:] = prcp_p[n,:,:] - ave_p[:,:]

for n in range(0,np.int32(num_n)):
  temp_n[n,:,:] = prcp_n[n,:,:] - ave_n[:,:]

temp_p2 = temp_p[:,:,:]*temp_p[:,:,:]
temp_n2 = temp_n[:,:,:]*temp_n[:,:,:]

#for i in range(0,144):
#  for j in range(0,73):
#    temp_ave_p[j,i] = np.sum(temp_p2[:,j,i],axis=0)
#    temp_ave_n[j,i] = np.sum(temp_n2[:,j,i],axis=0)

temp_ave_p = np.sum(temp_p2[:,:,:],axis=0)
temp_ave_n = np.sum(temp_n2[:,:,:],axis=0)

sd_diff[:,:] = np.sqrt((temp_ave_p[:,:]+temp_ave_n[:,:])/(num_p+num_n-2)*(1./num_p + 1./num_n))
t_diff_prcp = (ave_p - ave_n)/sd_diff

#####write output binary files
f = open('com_p_prcp.bin', 'wb')
f.write(np.array(ave_p[:,:], dtype='f4'))
f.write(np.array(t_p_prcp[:,:], dtype='f4'))
f.close()

f = open('com_n_prcp.bin', 'wb')
f.write(np.array(ave_n[:,:], dtype='f4'))
f.write(np.array(t_n_prcp[:,:], dtype='f4'))
f.close()

f = open('com_diff_prcp.bin', 'wb')
f.write(np.array(ave_p[:,:]-ave_n[:,:], dtype='f4'))
f.write(np.array(t_diff_prcp[:,:], dtype='f4'))
f.close()

exit()
