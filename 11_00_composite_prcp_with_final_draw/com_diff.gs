'reinit'
'clear'

'enable print ./temp.gx'

*'open com1.ctl'
*'open com2.ctl'
'open com_diff.ctl'
'set grads off'
'set lat -45 45'
'set z 7'

'set gxout shaded'


****for 90% in DOF=36
*'set clevs -1.68 1.68'
*'run /das_b/jhson/gs/color -kind blue->white->red -1.74 1.74 3.48'
****for 95% in DOF=36
*'set clevs -2.03 2.03'
*'run /das_b/jhson/gs/color -kind blue->white->red -2.03 2.03 4.06'
****for 90 and 95% in DOF=36  ***
*'run /das_b/jhson/gs/color -kind blue->white->red -1.5 1.5 1'
*'set clevs -2.03 -1.68 1.68 2.03'


****for 90% in DOF=6
*'set clevs -1.94 1.94'
*'run /das_b/jhson/gs/color -kind blue->white->red -1.74 1.74 3.48'
****for 95% in DOF=6
*'set clevs -2.45 2.45'
*'run /das_b/jhson/gs/color -kind blue->white->red -2.03 2.03 4.06'
****for 90 and 95% in DOF=6  ***
*'run /das_b/jhson/gs/color -kind blue->white->red -1.5 1.5 1'
*'set clevs -2.45 -1.94 1.94 2.45'


****for 95% in DOF=12
*'set clevs -2.23 2.23'
*'run /das_b/jhson/gs/color -kind blue->white->red -2.23 2.23 4.46'
****for 90% in DOF=12
*'set clevs -1.81 1.81'
*'run /das_b/jhson/gs/color -kind blue->white->red -1.81 1.81 3.62'
****for 90 and 95% in DOF=12  ***
'run /das_b/jhson/gs/color -kind blue->white->red -1.5 1.5 1'
'set clevs -2.23 -1.81 1.81 2.23'

'd com(t=2)'

'set gxout contour'
'set clevs -6 -5 -4 -3 -2 -1 1 2 3 4 5 6'
*'set clevs -2.5 -2.0 -1.5 -1 -0.5 0.5 1 1.5 2.0 2.5'
'd com(t=1)'

'run /das_b/jhson/gs/cbarn.gs 0.7 0 4.25 3.75'

'print'
'clear'
'disable print'

'!gxeps -c -i ./temp.gx -o ./com.eps'

