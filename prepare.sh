#!/bin/bash
rename 's/_//' _*
sed -i -e 's/# START/START/' *.dat
