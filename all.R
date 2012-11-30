#!/usr/bin/env Rscript

periodTable = read.table('periodTable.dat', header=T )
periodTable = periodTable[,-grep('^del', names(periodTable))]

periodSdCdf = ecdf(periodTable$sd)
sdThreshold = 10*median(periodTable$sd, na.rm=T)

sel = periodTable$sd <= sdThreshold

dev.new()
hist(periodTable$mean[sel])

dev.new();
hist(periodTable$sd[sel])
