#!/usr/bin/env Rscript

pdfs=T

source('statsFuncs.R')

periodTable = read.table('periodTable.dat', header=T )
periodTable = periodTable[,-grep('^del', names(periodTable))]

splitNames = sapply(as.character(periodTable$file), strsplit, '[.]')
periodTable$node = as.numeric(sub('rzmerl', '', sapply(splitNames, '[[', 1)))
periodTable$rank = as.numeric(sub('rzmerl', '', sapply(splitNames, '[[', 2)))

periodTable = periodTable[order(periodTable$node, periodTable$rank),]

periodSdCdf = ecdf(periodTable$sd)
sdThreshold = 10*median(periodTable$sd, na.rm=T)

sel = periodTable$sd <= sdThreshold

newDev('mean_period_histogram.pdf')
hist(periodTable$meanPeriod[sel])
if(pdfs) dev.off()

#newDev()
#hist(periodTable$sd[sel])

lowSdPeriodEcdf = ecdf(periodTable$meanPeriod[sel])

medianLowSdPeriod = median(periodTable$meanPeriod[sel], na.rm=T)

medianLowSdSel =
  sel &
  periodTable$meanPeriod > medianLowSdPeriod * .9 &
  periodTable$meanPeriod < medianLowSdPeriod * 1.1

wellBehaved = sapply(list(which(medianLowSdSel), medianLowSdSel), length)
wellBehaved = wellBehaved[[1]] / wellBehaved[[2]]
cat(paste(100*wellBehaved,'% have period standard deviations within 10% of the median sd\n'))

newDev('spike_lag_ecdf.pdf')
plot(ecdf(
  periodTable$offsetTime[medianLowSdSel]),
     main='first spike lag CDF')
if(pdfs) dev.off()

newDev('spike_lag_vs_rank_all.pdf')
plot(
#periodTable$node[medianLowSdSel],
#  periodTable$offsetTime[medianLowSdSel],
  periodTable$offsetTime,
  main='spike lag',
  ylab='time to first spike',
  xlab='rank'
  )
if(pdfs) dev.off()

newDev('spike_lag_vs_rank.pdf')
plot(
#periodTable$node[medianLowSdSel],
#  periodTable$offsetTime[medianLowSdSel],
  periodTable$offsetTime[sel],
  main='spike lag',
  ylab='time to first spike',
  xlab='rank'
  )
if(pdfs) dev.off()

#! @todo find a way to show spike lag variance within a node
