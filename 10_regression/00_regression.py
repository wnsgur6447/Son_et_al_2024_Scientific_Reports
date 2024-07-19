#-- import modules
import numpy as np
import matplotlib.pyplot as plt
import Nio
import os
from netCDF4 import Dataset    # Note: python is case-sensitive!

fname = "/data2/jhson/climate_indices/program/00_make_nc/NINO3.4.nc"
f = Nio.open_file(fname)
nino_temp = f.variables["nino"][:]
nino = np.zeros((43,12),dtype=float)
nino = nino_temp[0:516].reshape(43,12)
f.close()

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

fname = "/data2/jhson/era5/data/monthly_nc/pl_z_925_1979_2021_monthly.nc"
f = Nio.open_file(fname)
hgt = f.variables["z"][:,:,:]
z = np.zeros((43,12,73,144),dtype=float)
z = hgt.reshape(43,12,73,144)
f.close()

fname = "/data2/jhson/era5/data/monthly_nc/pl_u_925_1979_2021_monthly.nc"
f = Nio.open_file(fname)
uwnd = f.variables["u"][:,:,:]
u = np.zeros((43,12,73,144),dtype=float)
u = uwnd.reshape(43,12,73,144)
f.close()

fname = "/data2/jhson/era5/data/monthly_nc/pl_v_925_1979_2021_monthly.nc"
f = Nio.open_file(fname)
vwnd = f.variables["v"][:,:,:]
v = np.zeros((43,12,73,144),dtype=float)
v = vwnd.reshape(43,12,73,144)
f.close()

fname = "/data2/jhson/era5/program_ENSO_Indian/09_prcp_vp_sst_for_fig_1/final_index_for_Fig_1.nc"
f = Nio.open_file(fname)
prcp_index_temp = f.variables["prcp_index"][:,:]
prcp_index = np.zeros((43,12),dtype=float)
prcp_index = np.array(prcp_index_temp[:,:],dtype=float)
f.close()

fname = "/data2/jhson/era5/program_ENSO_Indian/08_scatter_plot/final_index.nc"
f = Nio.open_file(fname)
final_index_temp = f.variables["final_index"][:]
final_index = np.array(final_index_temp[:],dtype=float)
f.close()

yy = np.zeros((43,12),dtype='float32')
year_temp = np.arange(43)

prcp_index_mid = np.zeros((26),dtype='float32')
nino_index_mid = np.zeros((26),dtype='float32')
prcp_mid = np.zeros((26,73,144),dtype='float32')
z_mid = np.zeros((26,73,144),dtype='float32')
u_mid = np.zeros((26,73,144),dtype='float32')
v_mid = np.zeros((26,73,144),dtype='float32')
sst_mid = np.zeros((26,180,360),dtype='float32')

temp_num = 0
for year in range(0,43):
  if final_index[year] >= 0.75:
    yy[year,0] = 1
    print('red:',year_temp[year],year_temp[year]+1979)
  elif final_index[year] <= -0.75:
    yy[year,1] = 1
    print('blue:',year_temp[year],year_temp[year]+1979)
  else:
    yy[year,2] = 1
    prcp_index_mid[temp_num] = prcp_index[year,7-1]
    nino_index_mid[temp_num] = nino[year,7-1]
    for j in range(0,73):
      for i in range(0,144):
        prcp_mid[temp_num,j,i] = prcp[year,7-1,j,i]
        z_mid[temp_num,j,i] = z[year,7-1,j,i]
        u_mid[temp_num,j,i] = u[year,7-1,j,i]
        v_mid[temp_num,j,i] = v[year,7-1,j,i]
    for j in range(0,180):
      for i in range(0,360):
        sst_mid[temp_num,j,i] = sst[year,7-1,j,i]
    temp_num = temp_num+1

####for corr between prcp and NINO3.4 index
#print(np.corrcoef(nino[:,7-1],prcp_index[:,7-1]))
#for t in range(17):
#  print('moving',t,np.corrcoef(nino[0+t:26+t,7-1],prcp_index[0+t:26+t,7-1]))
#print(np.corrcoef(nino_index_mid[:],prcp_index_mid[:]))

####regression map
corr_prcp = np.zeros((73,144),dtype='float32')
corr_z = np.zeros((73,144),dtype='float32')
corr_u = np.zeros((73,144),dtype='float32')
corr_v = np.zeros((73,144),dtype='float32')
corr_sst = np.zeros((180,360),dtype='float32')

regr_prcp = np.zeros((73,144),dtype='float32')
regr_z = np.zeros((73,144),dtype='float32')
regr_u = np.zeros((73,144),dtype='float32')
regr_v = np.zeros((73,144),dtype='float32')
regr_sst = np.zeros((180,360),dtype='float32')

for t in range(0,26):
  for j in range(0,73):
    for i in range(0,144):
      temp = np.corrcoef(prcp_mid[:,j,i], nino_index_mid[:])
      corr_prcp[j,i] = temp[1,0]
      regr_prcp[j,i] = temp[1,0]*np.std(prcp_mid[:,j,i])

      temp = np.corrcoef(z_mid[:,j,i], nino_index_mid[:])
      corr_z[j,i] = temp[1,0]
      regr_z[j,i] = temp[1,0]*np.std(z_mid[:,j,i])

      temp = np.corrcoef(u_mid[:,j,i], nino_index_mid[:])
      corr_u[j,i] = temp[1,0]
      regr_u[j,i] = temp[1,0]*np.std(u_mid[:,j,i])

      temp = np.corrcoef(v_mid[:,j,i], nino_index_mid[:])
      corr_v[j,i] = temp[1,0]
      regr_v[j,i] = temp[1,0]*np.std(v_mid[:,j,i])

  for j in range(0,180):
    for i in range(0,360):
      temp = np.corrcoef(sst_mid[:,j,i], nino_index_mid[:])
      corr_sst[j,i] = temp[1,0]
      regr_sst[j,i] = temp[1,0]*np.std(sst_mid[:,j,i])

#####write output binary files
f = open('corr_prcp.bin', 'wb')
f.write(np.array(corr_prcp[:,:], dtype='f4'))
f.close()

f = open('corr_z.bin', 'wb')
f.write(np.array(corr_z[:,:], dtype='f4'))
f.close()

f = open('corr_u.bin', 'wb')
f.write(np.array(corr_u[:,:], dtype='f4'))
f.close()

f = open('corr_v.bin', 'wb')
f.write(np.array(corr_v[:,:], dtype='f4'))
f.close()

f = open('corr_sst.bin', 'wb')
f.write(np.array(corr_sst[:,:], dtype='f4'))
f.close()

f = open('regr_prcp.bin', 'wb')
f.write(np.array(regr_prcp[:,:], dtype='f4'))
f.close()

f = open('regr_z.bin', 'wb')
f.write(np.array(regr_z[:,:], dtype='f4'))
f.close()

f = open('regr_u.bin', 'wb')
f.write(np.array(regr_u[:,:], dtype='f4'))
f.close()

f = open('regr_v.bin', 'wb')
f.write(np.array(regr_v[:,:], dtype='f4'))
f.close()

f = open('regr_sst.bin', 'wb')
f.write(np.array(regr_sst[:,:], dtype='f4'))

exit()
