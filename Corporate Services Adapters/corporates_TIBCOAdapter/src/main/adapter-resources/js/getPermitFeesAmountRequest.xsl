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

	<xsl:template match="/SOAP-ENV:Envelope/SOAP-ENV:Body/ns:getPermitFeesAmount2Response/ns:getPermitFeesAmount2Return">
		{
			'feesInfo': '<xsl:value-of select="ns1:feesInfo" />',
			'permitExist': '<xsl:value-of select="ns1:permitExist" />'
		}
	</xsl:template>
</xsl:stylesheet>
