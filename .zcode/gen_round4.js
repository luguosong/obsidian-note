const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 读取剩余URL
const urls = fs.readFileSync('.zcode/round4_urls.txt', 'utf8').split('\n').filter(l => l.trim());

// 父主题前缀函数（与已有笔记命名保持一致）
function getPrefix(urlParts) {
  const p = urlParts;
  if (p[0] === 'extra' && p[1] === 'generics') return '泛型进阶';
  if (p[0] === 'extra' && p[1] === 'fullscreen') return '全屏独占模式';
  if (p[0] === 'extra' && p[1] === 'basics') return '扩展机制';
  if (p[0] === 'java' && p[1] === 'IandI') return '接口与继承';
  if (p[0] === 'java' && p[1] === 'javaOO') return '类与对象';
  if (p[0] === 'java' && p[1] === 'concepts') return '面向对象概念';
  if (p[0] === 'java' && p[1] === 'data') return '数字与字符串';
  if (p[0] === 'java' && p[1] === 'generics') return 'Java泛型';
  if (p[0] === 'java' && p[1] === 'nutsandbolts') return '语言基础';
  if (p[0] === 'java' && p[1] === 'annotations') return '注解';
  if (p[0] === 'java' && p[1] === 'package') return '包';
  if (p[0] === 'essential' && p[1] === 'concurrency') return '并发';
  if (p[0] === 'essential' && p[1] === 'environment') return 'Java核心类库-平台环境';
  if (p[0] === 'essential' && p[1] === 'io') return 'Java核心类库-基本IO';
  if (p[0] === 'essential' && p[1] === 'regex') return 'Java核心类库-正则表达式';
  if (p[0] === 'essential' && p[1] === 'exceptions') return 'Java核心类库-异常';
  if (p[0] === '2d') return '二维图形';
  if (p[0] === 'collections' && p[1] === 'streams') return '聚合操作';
  if (p[0] === 'collections' && p[1] === 'interfaces') return '集合-接口';
  if (p[0] === 'collections' && p[1] === 'implementations') return '集合-实现';
  if (p[0] === 'collections') return '集合';
  if (p[0] === 'deployment' && p[1] === 'applet') return '部署-Applet';
  if (p[0] === 'deployment' && p[1] === 'webstart') return '部署-WebStart';
  if (p[0] === 'deployment' && p[1] === 'doingMoreWithRIA') return '部署-RIA进阶';
  if (p[0] === 'deployment') return '部署';
  if (p[0] === 'i18n') return '国际化';
  if (p[0] === 'javabeans' && p[1] === 'quick') return 'JavaBeans-快速入门';
  if (p[0] === 'javabeans' && p[1] === 'writing') return 'JavaBeans-编写组件';
  if (p[0] === 'javabeans' && p[1] === 'advanced') return 'JavaBeans-高级主题';
  if (p[0] === 'javabeans') return 'JavaBeans';
  if (p[0] === 'jaxp' && p[1] === 'sax') return 'JAXP-SAX';
  if (p[0] === 'jaxp' && p[1] === 'dom') return 'JAXP-DOM';
  if (p[0] === 'jaxp') return 'JAXP';
  if (p[0] === 'jdbc' && p[1] === 'basics') return 'JDBC-基础';
  if (p[0] === 'jdbc') return 'JDBC';
  if (p[0] === 'jmx' && p[1] === 'mbeans') return 'JMX-MBeans';
  if (p[0] === 'jmx') return 'JMX';
  if (p[0] === 'jndi' && p[1] === 'ops') return 'JNDI-操作';
  if (p[0] === 'jndi' && p[1] === 'newstuff') return 'JNDI-新特性';
  if (p[0] === 'jndi' && p[1] === 'overview') return 'JNDI-概述';
  if (p[0] === 'jndi' && p[1] === 'ldap') return 'JNDI-LDAP高级';
  if (p[0] === 'jndi' && p[1] === 'objects') return 'JNDI-目录对象';
  if (p[0] === 'jndi') return 'JNDI';
  if (p[0] === 'reflect' && p[1] === 'class') return '反射-类';
  if (p[0] === 'reflect' && p[1] === 'member') return '反射-成员';
  if (p[0] === 'reflect' && p[1] === 'special') return '反射-数组与枚举';
  if (p[0] === 'reflect') return '反射';
  if (p[0] === 'rmi') return 'RMI';
  if (p[0] === 'security' && p[1] === 'tour1') return '安全-策略文件';
  if (p[0] === 'security') return '安全';
  if (p[0] === 'uiswing' && p[1] === 'components') return 'Swing-组件';
  if (p[0] === 'uiswing' && p[1] === 'events') return 'Swing-事件监听';
  if (p[0] === 'uiswing' && p[1] === 'layout') return 'Swing-布局';
  if (p[0] === 'uiswing' && p[1] === 'misc') return 'Swing-其他特性';
  if (p[0] === 'uiswing') return 'Swing';
  if (p[0] === 'datetime' && p[1] === 'iso') return '日期时间-ISO标准';
  if (p[0] === 'datetime') return '日期时间';
  if (p[0] === 'networking' && p[1] === 'sockets') return '自定义网络-Socket';
  if (p[0] === 'networking') return '自定义网络';
  if (p[0] === 'ext' && p[1] === 'basics') return '扩展机制';
  return p[0];
}

let count = 0;
const out = [];
for (const url of urls) {
  // 排除 .jar .schema 等非页面
  if (/\.(jar|schema|java|png|jpg|gif|zip)$/.test(url)) continue;
  // 提取路径
  const m = url.match(/\/tutorial\/(.+)$/);
  if (!m) continue;
  const parts = m[1].replace(/\.html$/, '').split('/');
  const last = parts[parts.length - 1];
  // 排除 QandE（问题和练习页）的某些情况，但仍抓取
  const prefix = getPrefix(parts);

  // 用 URL 最后一段作为子名（保持英文原文，翻译时再处理）
  // 但对已知常见词做映射
  const name = prefix + '-' + last;

  // 检查是否已存在
  const exists = fs.existsSync(path.join('网页裁剪', name + '.md'));
  if (!exists) {
    out.push(url + '\t' + name);
    count++;
  }
}
fs.writeFileSync('.zcode/fetch_map_round4.txt', out.sort().join('\n') + '\n', 'utf8');
console.log('第四轮待抓取: ' + count + ' 篇');
