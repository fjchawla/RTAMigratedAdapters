<xsl:stylesheet version="1.0"
                xmlns:ns="urn:CorporateService"
                xmlns:ns1="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd"
                xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:tns="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/1_0">
    <xsl:output method="text"/>
    <xsl:template match="/SOAP-ENV:Envelope/SOAP-ENV:Body/ns1:getActiveBookletByTrafficNoReturn/ns1:plates">
    
    
{
	"plates": [
	<xsl:for-each select="ns1:plate">
	{
	  "plateId": "<xsl:value-of select="ns1:plateId" />",
	  "plateNo": "<xsl:value-of select="ns1:plateNo" />",
	  "plateCodeId": "<xsl:value-of select="ns1:plateCodeId" />",
	  "PlateCFICode": "<xsl:value-of select="ns1:PlateCFICode" />",
	  "platePssCode": "<xsl:value-of select="ns1:platePssCode" />",
	  "plateCodeDesc": {
	  		"ar":"<xsl:value-of select="ns1:plateCodeDescAr" />",
	  		"en":"<xsl:value-of select="ns1:plateCodeDescEn" />",
	  },
	  "plateCategoryPssCode": "<xsl:value-of select="ns1:plateCategoryCode" />",
	  "plateCategoryCFICode": "<xsl:value-of select="ns1:plateCategoryCFICode" />",
	  "plateExpiryData": "<xsl:value-of select="ns1:bookletExpiryDate" />",
	  "plateCategoryDesc": {
	  		"ar":"<xsl:value-of select="ns1:plateCategoryDescAr" />",
	  		"en":"<xsl:value-of select="ns1:plateCategoryDescEn" />",
	  },
	  "insurance_comapny_id": "<xsl:value-of select="ns1:insuranceComapnyId" />",
	  "insurance_expiry_date": "<xsl:value-of select="ns1:insuranceExpiryDate" />",
	},
	</xsl:for-each>
	]
}
    </xsl:template>
</xsl:stylesheet>
