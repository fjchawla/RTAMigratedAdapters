<xsl:stylesheet version="1.0"
                xmlns:ns="urn:CorporateService"
                xmlns:ns1="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:tns="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/1_0"
                xmlns:h="http://www.w3.org/1999/xhtml">
    <xsl:output method="text"/>
    <xsl:template match="/SOAP-ENV:Envelope/SOAP-ENV:Body/ns1:getReservedPlateByTrafficNoReturn/ns1:reservedPlates">
    
    
{
	"plates": [
	<xsl:for-each select="ns1:reservedPlate">
	{
<!-- 	 <xsl:if test="ns1:plateCategoryCode = '2'">    -->
	  "plateId": "<xsl:value-of select="ns1:plateId" />",
	  "plateNo": "<xsl:value-of select="ns1:plateNo" />",
	  "plateCodeId": "<xsl:value-of select="ns1:plateCodeId" />",
	  "plateCFICode": "<xsl:value-of select="ns1:PlateCFICode" />",
	  "plateCodeDesc": {
	  		"ar":"<xsl:value-of select="ns1:plateCodeDescAr" />",
	  		"en":"<xsl:value-of select="ns1:plateCodeDescEn" />",
	  },
	  "plateCategoryCode": "<xsl:value-of select="ns1:plateCategoryCode" />",
	  "plateCategoryCFICode": "<xsl:value-of select="ns1:plateCategoryCFICode" />",
	  "plateCategoryDesc": {
	  		"ar":"<xsl:value-of select="ns1:plateCategoryDescAr" />",
	  		"en":"<xsl:value-of select="ns1:plateCategoryDescEn" />",
	  },
	  "insurance_comapny_id": "<xsl:value-of select="ns1:insuranceComapnyId" />",
	  "insurance_expiry_date": "<xsl:value-of select="ns1:insuranceExpiryDate" />",
	},
<!-- 	</xsl:if>  -->
	</xsl:for-each>
	]
}
    </xsl:template>
</xsl:stylesheet>
