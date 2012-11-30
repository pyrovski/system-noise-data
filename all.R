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

