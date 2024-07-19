import os
import numpy as np

var=["t","u","v","w","q","d","r","pv","z","vo"]
#year=[str(yyyy) for yyyy in range(1979,2023)]
year=[str(yyyy) for yyyy in range(1940,1979)]
#lev=["1000","925","850","700","600","500","400","300","250","200","150","100","70","50","30","20","10"]

for vvv in var:
 for yr in year:
  print(yr)
# for nlevel in lev:
  #os.system("cdo -b F64 mergetime /data2/jhson/era5/data/download/pl_"+vvv+"_"+nlevel+"_*.nc /data2/jhson/era5/data/nc/pl_"+vvv+"_"+nlevel+"_1979_2020.nc")
  #os.system("cdo -b F64 mergetime /data2/jhson/era5/data/nc/pl_"+vvv+"_"+nlevel+"_1979_2020.nc /data2/jhson/era5/data/download/pl_"+vvv+"_"+nlevel+"_2021.nc /data2/jhson/era5/data/nc/pl_"+vvv+"_"+nlevel+"_1979_2021.nc")
  os.system("cdo -b F64 monavg /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_"+yr+".nc /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_"+yr+"_monthly.nc")

