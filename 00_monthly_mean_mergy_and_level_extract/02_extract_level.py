import os

var=["t","u","v","w","q","d","r","pv","z","vo"]
year=[str(yyyy) for yyyy in range(1979,2023)]
level=["1000", "925", "850", "700", "600", "500", "400", "300", "250", "200", "150", "100", "70", "50", "30", "20", "10"]

for vvv in var:
  #for yr in year:
  for zzz in level:
    #os.system("cdo -b F64 -sellevel,"+zzz+" mergetime /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_*_monthly.nc /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_"+zzz+"_1979_2022_monthly.nc")
    #os.system("cdo -b F64 mergetime /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_*_monthly.nc /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_1979_2022_monthly.nc")
    os.system("cdo -b F64 -sellevel,"+zzz+" /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_1979_2022_monthly.nc /Volumes/ADATA2/ERA5/data_2.5/download/Global_2.5_pl_"+vvv+"_"+zzz+"_1979_2022_monthly.nc")
