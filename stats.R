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

# identify file type: time or cycles
if(length(grep('tick', names(a))) > 0){
# if cycles, add cycle offset to each row
  lines = readLines(filename, 20)
  eval(parse(text=sub('#','',grep('START_TICK', lines, value=T))))
  a$START.tick. = a$START.tick. + START_TICK
}

a = getPeakSteps(a)
periodEstimate = estimatePeriod(a)
cat(paste(paste(names(periodEstimate), periodEstimate, collapse=' '), '\n'))
