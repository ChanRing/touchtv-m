import api from '../utils/request'

export const testApi = () =>
    api.get(`/innovationservice/quzhi/app/v1/topicWorks/rankList`, {
        params: {
            topicPk: 1
        }
    })

export const testPostApi = () =>
    api.post('/innovationservice/quzhi/v1/worksCheck/search', {
        channelPk: -1,
        currentPage: 1,
        mobileNumber: '',
        pageSize: 10,
        realName: '',
        status: -1,
        title: '',
        videoType: ''
    })
