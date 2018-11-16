package com.szumi.app.p2pplatform.config.database

import org.apache.ibatis.session.SqlSessionFactory
import org.mybatis.spring.SqlSessionFactoryBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import javax.sql.DataSource

@Configuration
class DatabaseConfiguration @Autowired constructor(val dataSource: DataSource) {

    @Bean(name = ["sqlSessionFactory"])
    @Primary
    @Throws(Exception::class)
    fun sqlSessionFactory(): SqlSessionFactory? {
        val sessionFactory = SqlSessionFactoryBean()
        sessionFactory.setDataSource(dataSource)
        return sessionFactory.getObject()
    }

}