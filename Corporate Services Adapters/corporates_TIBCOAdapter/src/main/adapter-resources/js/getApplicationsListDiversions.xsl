<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:impl="http://ejbs.rta.gov.ae"
	xmlns:ns="http://www.rta.ae/ActiveMatrix/ESB/TSPSServiceSchema/XMLSchema"
	xmlns:tns="http://www.rta.ae/ActiveMatrix/ESB/TSPSService/1_0"
	xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:ns1="http://www.rta.ae/ActiveMatrix/ESB/TSPSService/XMLSchema"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:h="http://www.w3.org/1999/xhtml"
	>
	
	<xsl:output method="text" />

	<xsl:template match="/SOAP-ENV:Envelope/SOAP-ENV:Body/ns:getApplicationsListResponse/ns:getApplicationsListReturn/ns1:traApplicationInfos">
		{
		'applications': [
		<xsl:for-each select="ns1:TSPSApplicationInfo">
			{
			'applicationID': '<xsl:value-of select="ns1:applicationID" />',
			'applicationDate': '<xsl:value-of select="ns1:applicationDate" />',
			'applicationTypeID': '<xsl:value-of select="ns1:applicationTypeID" />',
			'applicationTypeDesc': {'ar':'<xsl:value-of select="ns1:applicationTypeDescAr" />','en':'<xsl:value-of select="ns1:applicationTypeDescEn" />'},
			'statusID': '<xsl:value-of select="ns1:statusID" />',
			'statusDesc': {'ar':'<xsl:value-of select="ns1:statusDescAr" />','en':'<xsl:value-of select="ns1:statusDescEn" />'},
			'tradeLicenseNo': '<xsl:value-of select="ns1:tradeLicenseNo" />'
			},
			
		</xsl:for-each>
		]
		}
	</xsl:template>
</xsl:stylesheet>
