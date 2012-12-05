#!/usr/bin/env Rscript

pdfs=T

source('statsFuncs.R')

periodTable = read.table('periodTable.dat', header=T )
periodTable = periodTable[,-grep('^del', names(periodTable))]

first=T
for(filename in sort(periodTable$file)){
  print(filename)
  a = read.table(filename, header=T)
  if(length(grep('tick', names(a))) > 0){
    startName = 'START.tick.'
    durationName = 'DURATION.tick.'
# if cycles, add cycle offset to each row
    lines = readLines(filename, 20)
    eval(parse(text=sub('#','',grep('START_TICK', lines, value=T))))
    a$START.tick. = a$START.tick. + START_TICK
  } else {
#! @todo
    startName = 'START.sec.'
    durationName = 'DURATION.sec.'
  }
  
  if(first){
    combined = a
    first = F
  } else {
    combined = rbind(combined, a)
  }
}

o = order(combined[[startName]])
combined = combined[o,]

#write.table(combined, 'combined.dat', quote=F, row.names=F)
# a = read.table('combined.dat', header=T, colClasses=c('numeric','integer'))
