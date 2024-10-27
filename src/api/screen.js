import request from '@/utils/request'

// 获取人员分布环形图
export function getPersonDistributionDonut (query) {
  return request({
    url: '/screen/BigScreenMonitor/personDistributionDonutC',
    method: 'get'
  })
}
