import React from 'react';
import { Button, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

// NOTICE -> both tests should fail, the checked prop value is incorrect

test('.toHaveProp eg1', () => {
  const { getByText } = render(
    <View>
      <Text allowFontScaling={false} testID="text">
        text
      </Text>
      <Button disabled testID="button" title="ok" />
    </View>,
  );

  expect(getByText('ok')).toHaveProp('disabled', 'nope');
});

test('.toHaveProp eg2', () => {
  const { getByText } = render(
    <View>
      <Text allowFontScaling={false} testID="text">
        text
      </Text>
      <Button disabled testID="button" title="ok" />
    </View>,
  );

  expect(getByText('text')).toHaveProp('allowFontScaling', 'thats not the prop value at all');
});
