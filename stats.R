#!/usr/bin/env Rscript

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
