import React from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

const GooglePlacesInput = (apiKey, setLocation, location) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={location || 'Search'}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'}
      listViewDisplayed='false' // true/false/undefined
      fetchDetails
      renderDescription={row => row.description || row.name} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const location = data.description || data.name
        setLocation(location)

        console.log(location)
        console.log(data)
        console.log(details)
      }}
      getDefaultValue={() => {
        return '' // text input default value
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: apiKey,
        language: 'en' // language of the results
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 1,
          borderBottomWidth: 1
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      currentLocation
      currentLocationLabel='Current location'
      nearbyPlacesAPI='GooglePlacesSearch'
      GooglePlacesSearchQuery={{
        rankby: 'distance'
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3'
      ]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  )
}

export default GooglePlacesInput
