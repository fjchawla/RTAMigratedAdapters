<xsl:stylesheet version="1.0"
                xmlns:ns="urn:CorporateService"
                xmlns:ns1="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:tns="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/1_0"
                xmlns:h="http://www.w3.org/1999/xhtml">
    <xsl:output method="text"/>
    <xsl:template match="/SOAP-ENV:Envelope/SOAP-ENV:Body/ns1:getInsuranceCompaniesReturn/ns1:organizations">
    
{
	"organizations": [
	<xsl:for-each select="ns1:organization">
	{
	  "id": "<xsl:value-of select="ns1:id" />",
	  "name": {
		"ar": "<xsl:value-of select="ns1:nameAr" />",
		"en": "<xsl:value-of select="ns1:nameEn" />"
			 },
	},
	</xsl:for-each>
	]
}
    </xsl:template>
</xsl:stylesheet>
