#!/usr/bin/env Rscript

# use this as a starting point for more advanced algorithms; we can
# estimate the period range, fraction of time in transit, number of
# bins for BLS

source('statsFuncs.R')

args = commandArgs(trailingOnly=T)
if(length(args)){
  filename = args[1]
}else{
  filename = 'rzmerl154.500.dat'
}

a = read.table(filename, header=T)
a = getPeakSteps(a)
periodEstimate = estimatePeriod(a)
cat(paste(paste(names(periodEstimate), periodEstimate, collapse=' '), '\n'))
