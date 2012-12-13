#!/usr/bin/env Rscript

# use this as a starting point for more advanced algorithms; we can
# estimate the period range, fraction of time in transit, number of
# bins for BLS

source('statsFuncs.R')

args = commandArgs(trailingOnly=T)
if(length(args)){
  filename = args[1]
}else{
  filename = 'rzmerl114_0_0.dat'
}

a = read.table(filename, header=T)

# identify file type: time or cycles
if(length(grep('tick', names(a))) > 0){
  startName = 'START.tick.'
  durationName = 'DURATION.tick.'

# if cycles, add cycle offset to each row
  lines = readLines(filename, 20)
  eval(parse(text=sub('#','',grep('START_TICK', lines, value=T))))
  a$START.tick. = a$START.tick. + START_TICK
} else {
  startName = 'START.sec.'
  durationName = 'DURATION.sec.'
}

a = getPeakSteps(a, durationName=durationName)
periodEstimate = estimatePeriod(a, durationName=durationName,
  startName=startName)[[1]]
cat(paste(paste(names(periodEstimate), periodEstimate, collapse=' '), '\n'))
