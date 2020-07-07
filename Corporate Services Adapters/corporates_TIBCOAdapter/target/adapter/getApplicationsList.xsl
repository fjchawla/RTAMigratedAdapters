<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
	xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/MobileTRAPermitsService/SharedResources/XMLSchema/Schema.xsd"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	>
	<xsl:output method="text" />

	<xsl:template match="/soapenv:Envelope/soapenv:Body/sch:getApplicationsListResponse/sch:getApplicationsListReturn/sch:traApplicationInfos">
		{
		'applications': [
		<xsl:for-each select="sch:TRAApplicationInfo">
		<xsl:variable name="applicationStamp" select='"sch:applicationDate"' />
			{
			'applicationID': '<xsl:value-of select="sch:applicationID" />',
			'applicationDate': '<xsl:value-of select="sch:applicationDate" />',
			'applicationTypeID': '<xsl:value-of select="sch:applicationTypeID" />',
			'applicationTypeDesc': {'ar':'<xsl:value-of select="sch:applicationTypeDescAr" />','en':'<xsl:value-of select="sch:applicationTypeDescEn" />'},
			'statusID': '<xsl:value-of select="sch:statusID" />',
			'statusDesc': {'ar':'<xsl:value-of select="sch:statusDescAr" />','en':'<xsl:value-of select="sch:statusDescEn" />'},
			'tradeLicenseNo': '<xsl:value-of select="sch:tradeLicenseNo" />'
			},
		</xsl:for-each>
		]
		}
	</xsl:template>
</xsl:stylesheet>
