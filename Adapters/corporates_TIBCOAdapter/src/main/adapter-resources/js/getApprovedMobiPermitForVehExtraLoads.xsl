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

	<xsl:template match="/SOAP-ENV:Envelope/SOAP-ENV:Body/ns:getApprovedMobilityPermitForVehiclesOfExtraLoadDetails2Response/ns:getApprovedMobilityPermitForVehiclesOfExtraLoadDetails2Return">
		{
		
		<xsl:for-each select="ns1:approvedMobilityPermitForVehiclesOfExtraLoadDetails">
		'extraLoadsDetails': {
			'id': '<xsl:value-of select="ns1:applicationID" />',
			'permitType': '<xsl:value-of select="ns1:permitType" />',
			'permitSubType': '<xsl:value-of select="ns1:permitSubType" />',
			'licenceNo': '<xsl:value-of select="ns1:licenseNo" />',
			'companyName': {'ar':'<xsl:value-of select="ns1:companyArabicName" />','en':'<xsl:value-of select="ns1:companyEnglishName" />'},
			'vehicleSource': '<xsl:value-of select="ns1:vehicleSource" />',
			'vehicleDestination': '<xsl:value-of select="ns1:vehicleDestination" />',
			'noOfVehicles': '<xsl:value-of select="ns1:noOfVehicles" />',
			'permitExpirtDate': '<xsl:value-of select="ns1:permitExpirtDate" />',
			'workingTimeFrom': '<xsl:value-of select="ns1:workingTimeFrom" />',
			'workingTimeTo': '<xsl:value-of select="ns1:workingTimeTo" />',
			'length': '<xsl:value-of select="ns1:length" />',
			'width': '<xsl:value-of select="ns1:width" />',
			'height': '<xsl:value-of select="ns1:height" />',
			'weight': '<xsl:value-of select="ns1:weight" />',
			'permitStartDate': '<xsl:value-of select="ns1:permitStartDate" />',
			'termsAndConditions': '<xsl:value-of select="ns1:termsAndConditions" />',
			'vehicleType': {'ar':'<xsl:value-of select="ns1:vehicleTypeEn" />','en':'<xsl:value-of select="ns1:vehicleTypeEn" />'}
			},
		</xsl:for-each>
			'permitExists': '<xsl:value-of select="ns1:permitExists" />'
		}
	</xsl:template>
	
</xsl:stylesheet>
