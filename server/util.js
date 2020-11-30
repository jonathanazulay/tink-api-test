module.exports.groupBy = (d, fn) => {
  const groups = {}
  for (const item of d) {
    const groupKey = fn(item)
    const group = groups[groupKey] || []
    group.push(item)
    groups[groupKey] = group
  }
  return groups
}

module.exports.sumBy = (d, fn) => {
  return d.reduce((sum, i) => sum + fn(i), 0)
}
