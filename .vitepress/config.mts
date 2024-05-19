import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "jaggerguo",
  description: "个人笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '茶馆', link: '/doc/html基础知识' }
    ],

    sidebar: [
      {
        text: '前端基础知识',
        items: [
          { text: 'html', link: '/doc/html基础知识' },
          { text: 'css', link: '/doc/api-examples' },
          { text: 'js', link: '/doc/api-examples' },
          { text: '网络', link: '/doc/net' },
          { text: '数据结构', link: '/doc/api-examples' },
          { text: '算法', link: '/doc/algorithm' },
          { text: '设计模式', link: '/doc/designmode' },
       
        ]
      },
      {
        text: '服务端',
        items: [
          { text: 'docker', link: '/doc/docker' },
          { text: 'go', link: '/doc/golang-started'},
          { text: 'mysql', link: '/doc/mac安装配置本地mysql' },
          { text: '网络', link: '/doc/api-examples' },
          { text: '数据结构', link: '/doc/api-examples' },
          { text: '算法', link: '/doc/algorithm' },
          { text: '设计模式', link: '/doc/designmode' },
          { text: 'docker', link: '/doc/docker' }
        ]
      },
      {
        text: '框架',
        items: [
          { text: 'Vue', link: '/doc/markdown-examples' },
          { text: 'react', link: '/doc/api-examples' },
          { text: '小程序', link: '/doc/api-examples' }
        ]
      },
      {
        text: 'nodeJs',
        items: [
          { text: '基础知识', link: '/doc/初识NestJs' },
          { text: 'nestJs', link: '/doc/初识NestJs' },
          { text: 'express', link: '/doc/api-examples' },
          { text: 'koa', link: '/doc/api-examples' },
        ]
      },
      {
        text: 'webgl',
        items: [
          { text: 'threeJs', link: '/doc/threejs' },
          { text: 'babilong', link: '/doc/api-examples' },
          { text: 'cesium', link: '/doc/api-examples' }
        ]
      },
     
      {
        text: '工程化',
        items: [
          { text: '基于husky注释提交', link: '/doc/基于husky钩子的个性化提交注释处理' },
          { text: '效率工具', link: '/doc/api-examples' },
          { text: '单体库', link: '/doc/api-examples' },
          { text: 'npm包管理', link: '/doc/api-examples' }
        ]
      },
      {
        text: '项目',
        items: [
          { text: 'Markdown Examples', link: '/doc/markdown-examples' },
          { text: 'Runtime API Examples', link: '/doc/api-examples' }
        ]
      },
      {
        text: '面试',
        items: [
          { text: 'Markdown Examples', link: '/doc/markdown-examples' },
          { text: 'Runtime API Examples', link: '/doc/api-examples' }
        ]
      },
      {
        text: '其他',
        items: [
          { text: '5种开源协议的比较', link: '/doc/5种开源协议的比较' },
          { text: 'JS复制内容到剪切板', link: '/doc/JS复制内容到剪切板' },
          { text: 'nodeJS控制台彩色文字输出', link: '/doc/NodeJS控制台彩色文字输出' },
          { text: '汇报', link: '/doc/汇报' },
          { text: '常用的工具', link: '/doc/tool' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jaggerguov' }
    ]
  }
})
