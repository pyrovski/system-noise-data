#!/bin/bash

ls *.dat | sort | parallel 'echo;echo -n {}" "; ./stats.R {}' | tee periodTable

(echo file delmean meanPeriod delsd sd;sed -e '/^$/d' periodTable) | grep mean > periodTable.dat

