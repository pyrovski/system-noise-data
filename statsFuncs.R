#!/usr/bin/env Rscript

#! @todo how to qualify peaks?
# - locations where the smoothed time series is X% higher than the median
#  - this tends to also raise nearby samples, but that's probably ok
#  - for an 11-element filter, use 10x higher than the median
# - locations where the original time series is X% higher than the median, with nearby samples smoothed together

newDev = function(name=NULL){
#  if(length(ls(name=-1,pattern = 'pdfs')) == 0)
#    pdfs=F
  if(pdfs){
    if(!is.null(name)){
      if(length(grep('pdf$', name)) == 0)
        name = paste(name, 'pdf', sep='.')
      result = pdf(name)
    } else
      result = pdf()
  } else
    result = dev.new()
}

#! @todo figure out how to eliminate short period estimates
# - obvious ways: increase filter length, require minimum period
getPeakSteps = function(input, filterLength=21, medThreshold=10,
    durationName='DURATION.sec.'){
#! @todo filtering works much faster on vectors/matrices
  input$filtered = filter(input[[durationName]], rep(1, filterLength)/filterLength)
  input$filtered[which(is.na(input$filtered))] = 0
  sel = input$filtered >= medThreshold*median(input$filtered)
  input$steps = 0
  input$steps[sel] = 1
#  input$steps[!sel] = 0
  return(input)
}

# get mean low and high time between spike edges and add them
estimatePeriod = function(input, startName='START.sec.',
  durationName='DURATION.sec.'){
  stepsRLE = rle(as.vector(input$steps))

  # assume first sample is zero
  transitionIndices = cumsum(stepsRLE$lengths)
  transitionIndices = transitionIndices[1:length(transitionIndices) - 1]
  starts = transitionIndices[seq(1, length(transitionIndices), 2)]
  ends = transitionIndices[seq(2, length(transitionIndices), 2)]

  startTimes = input[[startName]][starts]
  endTimes = input[[startName]][ends]

  startDiffs = diff(startTimes)
  endDiffs = diff(endTimes)

  # this finds the middle of each spike, not necessarily the maximum
  meanDiffs = diff((startTimes + endTimes)/2)

  overageFraction = sum(input[[durationName]]) /
    diff(range(input[[startName]]))
  
  return(list(
    mean=mean(meanDiffs),
    sd=sd(meanDiffs),
    median=median(meanDiffs),
    min=min(meanDiffs),
    max=max(meanDiffs),
    offsetTime=min(startTimes),
    overageFraction=overageFraction
    ))
}
