#!/bin/bash

ls *.dat | sort | parallel 'echo;echo -n {}" "; ./stats.R {}' | tee periodTable

(echo file delmean meanPeriod delsd sd del median del min del max del offsetTime del overageFraction;sed -e '/^$/d' periodTable) | grep mean > periodTable.dat

